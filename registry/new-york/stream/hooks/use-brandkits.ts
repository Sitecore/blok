import { useCallback, useEffect, useMemo, useState } from "react"
import {
  Brandkit,
  brandkitListFromApiResponse,
  brands,
  getBrandkitDisplayName,
  getBrandkitTagsByCategory,
  hasBrandkitLogo,
  // HTTP error types
  HTTPError,
  isDeletedBrandkit,
  // Domain model utilities
  isDraftBrandkit,
  isPublishedBrandkit,
  ListBrandKitsModelResponse,
  // Domain types
  type BrandkitStatus,
  // HeyAPI generated types
  type ListBrandKitsApiBrandsV1OrganizationsOrganizationIdBrandkitsGetData,
} from "@sitecore/stream-ui-core"

// Hook options type - using HeyAPI generated types
export type UseBrandkitsOptions =
  ListBrandKitsApiBrandsV1OrganizationsOrganizationIdBrandkitsGetData["path"] &
    (ListBrandKitsApiBrandsV1OrganizationsOrganizationIdBrandkitsGetData["query"] extends undefined
      ? {}
      : ListBrandKitsApiBrandsV1OrganizationsOrganizationIdBrandkitsGetData["query"])

export interface UseBrandkitsReturn {
  // Existing properties (unchanged)
  isLoading: boolean
  brandkits: Brandkit[]
  error: Error | null
  refetch: () => Promise<void>

  // New computed data
  draftBrandkits: Brandkit[]
  publishedBrandkits: Brandkit[]
  totalCount: number

  // New utilities
  utils: {
    findByName: (name: string) => Brandkit | undefined
    filterByStatus: (status: BrandkitStatus) => Brandkit[]
    filterByTag: (category: string, value: string) => Brandkit[]
    getDisplayNames: () => string[]
    summary: () => {
      total: number
      drafts: number
      published: number
      deleted: number
      withLogos: number
    }
  }
}

/**
 * Hook to fetch brandkits from the API with enhanced utilities and computed properties.
 *
 * @param options - Configuration options for the API request
 * @param options.organizationId - Required organization ID for the request
 * @param options.pageSize - Number of brandkits to fetch per page (default: 50)
 * @param options.pageNumber - Page number to fetch (default: 1)
 * @param options.search - Search term to filter brandkits
 * @param options.status - Filter by brandkit status
 * @param options.includeDeleted - Whether to include deleted brandkits
 * @param options.parentId - Filter by parent brandkit ID
 * @param options.referenceType - Filter by reference type
 * @param options.referenceId - Filter by reference ID
 * @returns Object containing the brandkits data, loading state, error state, computed properties, and utility functions
 *
 * @example
 * // Basic usage
 * const { brandkits, isLoading, error } = useBrandkits({
 *   organizationId: 'org-123',
 *   pageSize: 10,
 *   pageNumber: 1,
 * });
 *
 * // Enhanced usage with computed properties
 * const {
 *   brandkits,
 *   draftBrandkits,
 *   publishedBrandkits,
 *   totalCount,
 *   utils,
 *   isLoading
 * } = useBrandkits({
 *   organizationId: 'org-123',
 *   pageSize: 20
 * });
 *
 * // Using utility functions
 * const brandkitByName = utils.findByName('My Brandkit');
 * const draftBrandkits = utils.filterByStatus('draft');
 * const industryBrandkits = utils.filterByTag('industry', 'technology');
 * const displayNames = utils.getDisplayNames();
 * const summary = utils.summary();
 *
 * // Using computed properties
 * console.log(`Total brandkits: ${totalCount}`);
 * console.log(`Draft brandkits: ${draftBrandkits.length}`);
 * console.log(`Published brandkits: ${publishedBrandkits.length}`);
 */
export function useBrandkits(
  options?: UseBrandkitsOptions
): UseBrandkitsReturn {
  const [brandkits, setBrandkits] = useState<Brandkit[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchBrandkits = useCallback(async () => {
    if (!options?.organizationId) {
      console.error(
        "useBrandkits: organizationId is required but was not provided"
      )
      setIsLoading(false)
      setBrandkits([])
      setError(null)
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const response =
        await brands.listBrandKitsApiBrandsV1OrganizationsOrganizationIdBrandkitsGet(
          {
            path: { organizationId: options?.organizationId || "" },
            query: {
              pageSize: options?.pageSize || 50,
              pageNumber: options?.pageNumber || 1,
              search: options?.search,
              status: options?.status,
              includeDeleted: options?.includeDeleted,
              parentId: options?.parentId,
              referenceType: options?.referenceType,
              referenceId: options?.referenceId,
            },
          }
        )

      const fetchedBrandkits = response.data
        ? brandkitListFromApiResponse(
            response.data as ListBrandKitsModelResponse
          )
        : []

      setBrandkits(fetchedBrandkits)
    } catch (err) {
      console.error("Brandkits fetch error:", err)

      // Handle ky HTTPError specifically
      if (err instanceof HTTPError) {
        setError(
          new Error(
            `API Error: ${err.response.status} - ${err.response.statusText}`
          )
        )
      } else {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch brandkits")
        )
      }
      setBrandkits([])
    } finally {
      setIsLoading(false)
    }
  }, [
    options?.organizationId,
    options?.pageSize,
    options?.search,
    options?.status,
    options?.includeDeleted,
  ])

  useEffect(() => {
    if (options?.organizationId) {
      fetchBrandkits()
    } else {
      console.error(
        "useBrandkits: organizationId is required but was not provided"
      )

      setIsLoading(false)
      setBrandkits([])
      setError(null)
    }
  }, [
    options?.organizationId,
    options?.pageSize,
    options?.pageNumber,
    options?.search,
    options?.status,
    options?.includeDeleted,
    options?.parentId,
    options?.referenceType,
    options?.referenceId,
  ])

  // Computed values with useMemo for performance
  const draftBrandkits = useMemo(
    () => brandkits.filter(isDraftBrandkit),
    [brandkits]
  )

  const publishedBrandkits = useMemo(
    () => brandkits.filter(isPublishedBrandkit),
    [brandkits]
  )

  // Context-aware utilities object
  const utils = useMemo(
    () => ({
      /**
       * Find a brandkit by name (case-insensitive search)
       * @param name - The name to search for
       * @returns The matching brandkit or undefined
       */
      findByName: (name: string): Brandkit | undefined => {
        const searchName = name.toLowerCase()
        return brandkits.find((brandkit) =>
          getBrandkitDisplayName(brandkit).toLowerCase().includes(searchName)
        )
      },

      /**
       * Filter brandkits by status
       * @param status - The status to filter by
       * @returns Array of brandkits with the specified status
       */
      filterByStatus: (status: BrandkitStatus): Brandkit[] => {
        return brandkits.filter((brandkit) => brandkit.status === status)
      },

      /**
       * Filter brandkits by tag category and value
       * @param category - The tag category to filter by
       * @param value - The tag value to filter by
       * @returns Array of brandkits that have the specified tag
       */
      filterByTag: (category: string, value: string): Brandkit[] => {
        return brandkits.filter((brandkit) => {
          const brandkitTags = getBrandkitTagsByCategory(brandkit, category)
          return brandkitTags.includes(value)
        })
      },

      /**
       * Get display names for all brandkits
       * @returns Array of display names
       */
      getDisplayNames: (): string[] => {
        return brandkits.map(getBrandkitDisplayName)
      },

      /**
       * Get summary statistics for the brandkits collection
       * @returns Object with counts for different brandkit states
       */
      summary: () => {
        const total = brandkits.length
        const drafts = brandkits.filter(isDraftBrandkit).length
        const published = brandkits.filter(isPublishedBrandkit).length
        const deleted = brandkits.filter(isDeletedBrandkit).length
        const withLogos = brandkits.filter(hasBrandkitLogo).length

        return {
          total,
          drafts,
          published,
          deleted,
          withLogos,
        }
      },
    }),
    [brandkits]
  )

  return {
    // Existing return values (unchanged)
    isLoading,
    brandkits,
    error,
    refetch: fetchBrandkits,

    // New computed values
    draftBrandkits,
    publishedBrandkits,
    totalCount: brandkits.length,

    // New utilities
    utils,
  }
}

// Re-export domain utilities for better developer experience
export {
  isDraftBrandkit,
  isPublishedBrandkit,
  isDeletedBrandkit,
  isLockedBrandkit,
  getBrandkitDisplayName,
  hasBrandkitLogo,
  getBrandkitTagsByCategory,
  createBrandkit,
  type BrandkitStatus,
  type Tag,
  type BrandkitReference,
} from "@sitecore/stream-ui-core"
