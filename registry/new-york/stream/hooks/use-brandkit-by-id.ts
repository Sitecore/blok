import { useCallback, useEffect, useMemo, useState } from "react"
import {
  Brandkit,
  brandkitFromApiResponse,
  brandkitToPlainObject,
  brands,
  getBrandkitDisplayName,
  GetBrandKitModelResponse,
  getBrandkitTagsByCategory,
  hasBrandkitLogo,
  // HTTP error types
  HTTPError,
  isDeletedBrandkit,
  // Domain utilities
  isDraftBrandkit,
  isLockedBrandkit,
  isPublishedBrandkit,
  // HeyAPI generated types
  type GetBrandKitApiBrandsV1OrganizationsOrganizationIdBrandkitsBrandkitIdGetData,
} from "@sitecore/stream-ui-core"

// Hook options type - using HeyAPI generated types
export type UseBrandkitByIdOptions =
  GetBrandKitApiBrandsV1OrganizationsOrganizationIdBrandkitsBrandkitIdGetData["path"] &
    (GetBrandKitApiBrandsV1OrganizationsOrganizationIdBrandkitsBrandkitIdGetData["query"] extends undefined
      ? {}
      : GetBrandKitApiBrandsV1OrganizationsOrganizationIdBrandkitsBrandkitIdGetData["query"])

export interface UseBrandkitsByIdProps {
  // Existing properties (unchanged)
  isLoading: boolean
  brandkit: Brandkit | null
  error: Error | null
  refetch: () => Promise<void>

  // New computed properties
  displayName: string | null
  hasLogo: boolean
  isDraft: boolean
  isPublished: boolean
  isDeleted: boolean
  isLocked: boolean
  tagCategories: string[]
  referenceCount: number

  // New utility functions
  utils: {
    getTagsByCategory: (category: string) => readonly string[]
    hasTag: (category: string, value: string) => boolean
    canEdit: () => boolean
    getStatusDisplay: () => string
    getMetadata: <T = unknown>(key: string) => T | undefined
    setMetadata: (key: string, value: unknown) => void
    getAgeInDays: () => number
    isRecentlyUpdated: (withinDays?: number) => boolean
    serialize: () => Record<string, unknown>
  }
}

/**
 * Hook to fetch a single brandkit by ID with enhanced utilities and computed properties.
 *
 * @param brandkitId - The ID of the brandkit to fetch. If empty, no fetch will occur.
 * @param options - Configuration options for the API request
 * @param options.organizationId - Required organization ID for the request
 * @param options.includeDeleted - Whether to include deleted brandkits in the response
 * @returns Object containing the brandkit data, loading state, error state, computed properties, and utility functions
 *
 * @example
 * // Basic usage
 * const { brandkit, isLoading, error } = useBrandkitById('brandkit-123', {
 *   organizationId: 'org-456'
 * });
 *
 * // Enhanced usage with computed properties
 * const {
 *   brandkit,
 *   displayName,
 *   isDraft,
 *   hasLogo,
 *   utils,
 *   isLoading
 * } = useBrandkitById('brandkit-123', { organizationId: 'org-456' });
 *
 * // Using utility functions
 * const canEdit = utils.canEdit();
 * const industryTags = utils.getTagsByCategory('industry');
 * const customData = utils.getMetadata<string>('customField');
 * utils.setMetadata('lastViewed', new Date().toISOString());
 *
 * // Using computed properties
 * if (isDraft) {
 *   console.log(`${displayName} is a draft brandkit`);
 * }
 *
 * if (hasLogo) {
 *   console.log(`${displayName} has a logo`);
 * }
 */
export function useBrandkitById(
  brandkitId: string = "",
  options?: Omit<UseBrandkitByIdOptions, "brandkitId">
): UseBrandkitsByIdProps {
  const [brandkit, setBrandkit] = useState<Brandkit | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // Add local metadata state for mutations
  const [localMetadata, setLocalMetadata] = useState<Record<string, unknown>>(
    {}
  )

  const fetchBrandkit = useCallback(async () => {
    if (!brandkitId) {
      setBrandkit(null)
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const response =
        await brands.getBrandKitApiBrandsV1OrganizationsOrganizationIdBrandkitsBrandkitIdGet(
          {
            path: {
              organizationId: options?.organizationId || "",
              brandkitId: brandkitId,
            },
            query: {
              includeDeleted: options?.includeDeleted,
            },
          }
        )

      setBrandkit(
        response.data
          ? brandkitFromApiResponse(response.data as GetBrandKitModelResponse)
          : null
      )
    } catch (err) {
      console.error("Brandkit fetch error:", err)

      // Handle ky HTTPError specifically
      if (err instanceof HTTPError) {
        setError(
          new Error(
            `API Error: ${err.response.status} - ${err.response.statusText}`
          )
        )
      } else {
        setError(
          err instanceof Error ? err : new Error("Failed to fetch brandkit")
        )
      }
      setBrandkit(null)
    } finally {
      setIsLoading(false)
    }
  }, [brandkitId, options?.organizationId, options?.includeDeleted])

  useEffect(() => {
    fetchBrandkit()
  }, [brandkitId, options?.organizationId, options?.includeDeleted])

  // Computed properties using useMemo for performance
  const displayName = useMemo(
    () => (brandkit ? getBrandkitDisplayName(brandkit) : null),
    [brandkit]
  )

  const hasLogo = useMemo(
    () => (brandkit ? hasBrandkitLogo(brandkit) : false),
    [brandkit]
  )

  const isDraft = useMemo(
    () => (brandkit ? isDraftBrandkit(brandkit) : false),
    [brandkit]
  )

  const isPublished = useMemo(
    () => (brandkit ? isPublishedBrandkit(brandkit) : false),
    [brandkit]
  )

  const isDeleted = useMemo(
    () => (brandkit ? isDeletedBrandkit(brandkit) : false),
    [brandkit]
  )

  const isLocked = useMemo(
    () => (brandkit ? isLockedBrandkit(brandkit) : false),
    [brandkit]
  )

  const tagCategories = useMemo(
    () =>
      brandkit ? [...new Set(brandkit.tags.map((tag) => tag.category))] : [],
    [brandkit]
  )

  const referenceCount = useMemo(
    () => (brandkit ? brandkit.references.length : 0),
    [brandkit]
  )

  // Utility functions bound to current brandkit
  const utils = useMemo(
    () => ({
      /**
       * Get all tag values for a specific category
       */
      getTagsByCategory: (category: string): readonly string[] =>
        brandkit ? getBrandkitTagsByCategory(brandkit, category) : [],

      /**
       * Check if brandkit has a specific tag category/value combination
       */
      hasTag: (category: string, value: string): boolean =>
        brandkit
          ? getBrandkitTagsByCategory(brandkit, category).includes(value)
          : false,

      /**
       * Check if brandkit can be edited (not locked and not deleted)
       */
      canEdit: (): boolean =>
        brandkit
          ? !isLockedBrandkit(brandkit) && !isDeletedBrandkit(brandkit)
          : false,

      /**
       * Get user-friendly status display text
       */
      getStatusDisplay: (): string => {
        if (!brandkit) return "Not loaded"
        return (
          brandkit.status.charAt(0).toUpperCase() + brandkit.status.slice(1)
        )
      },

      /**
       * Get metadata value with type safety
       */
      getMetadata: <T = unknown>(key: string): T | undefined => {
        if (!brandkit) return undefined
        const effectiveMetadata = { ...brandkit.metadata, ...localMetadata }
        return effectiveMetadata[key] as T
      },

      /**
       * Set local metadata (doesn't affect original brandkit)
       */
      setMetadata: (key: string, value: unknown): void => {
        setLocalMetadata((prev) => ({ ...prev, [key]: value }))
      },

      /**
       * Calculate age of brandkit in days
       */
      getAgeInDays: (): number => {
        if (!brandkit) return 0
        const now = new Date()
        const created = brandkit.createdOn
        return Math.floor(
          (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24)
        )
      },

      /**
       * Check if brandkit was recently updated
       */
      isRecentlyUpdated: (withinDays: number = 7): boolean => {
        if (!brandkit) return false
        const now = new Date()
        const updated = brandkit.updatedOn
        const daysDiff = Math.floor(
          (now.getTime() - updated.getTime()) / (1000 * 60 * 60 * 24)
        )
        return daysDiff <= withinDays
      },

      /**
       * Serialize brandkit to plain object
       */
      serialize: (): Record<string, unknown> =>
        brandkit ? brandkitToPlainObject(brandkit) : {},
    }),
    [brandkit, localMetadata]
  )

  return {
    // Existing return values
    isLoading,
    brandkit,
    error,
    refetch: fetchBrandkit,

    // New computed properties
    displayName,
    hasLogo,
    isDraft,
    isPublished,
    isDeleted,
    isLocked,
    tagCategories,
    referenceCount,

    // New utilities
    utils,
  }
}

// Re-export domain utilities for convenience
export {
  isDraftBrandkit,
  isPublishedBrandkit,
  isDeletedBrandkit,
  isLockedBrandkit,
  getBrandkitDisplayName,
  hasBrandkitLogo,
  getBrandkitTagsByCategory,
  brandkitToPlainObject,
  createBrandkit,
  type BrandkitStatus,
} from "@sitecore/stream-ui-core"
