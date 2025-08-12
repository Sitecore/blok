import {
  Brandkit,
  contenthubBrandsBrandKit,
  normalizeContentHubBrandkitFromHeyApi,
  brandkitFromApiResponse,
  // Domain utilities
  isDraftBrandkit,
  isPublishedBrandkit,
  getBrandkitDisplayName,
  // Types
  type BrandkitStatus,
  HTTPError,
} from '@sitecore/stream-ui-core';
import { useCallback, useEffect, useState, useMemo } from 'react';

// Hook options - ContentHub specific parameters
export interface UseContentHubBrandkitsOptions {
  brandId: number; // Required ContentHub brand ID
  search?: string; // Search term (client-side filtering)
}

// Same return interface as default useBrandkits for consistency
export interface UseContentHubBrandkitsReturn {
  // Core data
  isLoading: boolean;
  brandkits: Brandkit[];
  error: Error | null;
  refetch: () => Promise<void>;

  // Computed data (same as default hook)
  draftBrandkits: Brandkit[];
  publishedBrandkits: Brandkit[];
  totalCount: number;

  // Pagination metadata
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasNext: boolean;
    hasPrev: boolean;
    totalPages: number;
  };

  // Same utilities as default hook
  utils: {
    findByName: (name: string) => Brandkit | undefined;
    filterByStatus: (status: BrandkitStatus) => Brandkit[];
    getDisplayNames: () => string[];
    summary: () => {
      total: number;
      drafts: number;
      published: number;
      deleted: number;
      withLogos: number;
    };
  };
}

/**
 * Hook to fetch brandkits from ContentHub API for a specific brand.
 *
 * Returns the same interface as useBrandkits() for consistent developer experience.
 *
 * @param options - ContentHub-specific options
 * @param options.brandId - Required ContentHub brand ID (number)
 * @param options.search - Optional search term (client-side filtering)
 *
 * @example
 * ```typescript
 * // Basic usage
 * const { brandkits, isLoading, error } = useContentHubBrandkits({
 *   brandId: 123
 * });
 *
 * // With pagination and search
 * const {
 *   brandkits,
 *   utils,
 *   draftBrandkits
 * } = useContentHubBrandkits({
 *   brandId: 123,
 *   search: 'nike'
 * });
 *
 * // Same utilities as default hook
 * const brandkitByName = utils.findByName('Nike Air');
 * const summary = utils.summary();
 * ```
 */
export function useContentHubBrandkits(
  options: UseContentHubBrandkitsOptions
): UseContentHubBrandkitsReturn {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [allBrandkits, setAllBrandkits] = useState<Brandkit[]>([]);

  const fetchBrandkits = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Call ContentHub API - no pagination parameters (not supported)
      const response =
        await contenthubBrandsBrandKit.getApiV1BrandsByBrandIdBrandkits({
          path: {
            brandId: options.brandId,
          },
        });

      // Transform ContentHub response to domain model
      const data = response.data as any;
      if (data && Array.isArray(data)) {
        // ContentHub -> Standard -> Domain transformation
        const normalizedItems = data
          .map(normalizeContentHubBrandkitFromHeyApi) // ContentHub -> Standard format
          .map(brandkitFromApiResponse); // Standard -> Domain model

        setAllBrandkits(normalizedItems);
      } else {
        setAllBrandkits([]);
      }
    } catch (err) {
      console.error('ContentHub brandkits fetch error:', err);

      if (err instanceof HTTPError) {
        setError(
          new Error(
            `API Error: ${err.response.status} - ${err.response.statusText}`
          )
        );
      } else {
        setError(
          err instanceof Error ? err : new Error('Failed to fetch brandkits')
        );
      }
      setAllBrandkits([]);
    } finally {
      setIsLoading(false);
    }
  }, [options.brandId]);

  useEffect(() => {
    fetchBrandkits();
  }, [fetchBrandkits]);

  // Client-side filtering only
  const brandkits = useMemo(() => {
    if (!options.search) {
      return allBrandkits;
    }

    const searchTerm = options.search.toLowerCase();
    return allBrandkits.filter(
      brandkit =>
        getBrandkitDisplayName(brandkit).toLowerCase().includes(searchTerm) ||
        brandkit.description.toLowerCase().includes(searchTerm)
    );
  }, [allBrandkits, options.search]);

  // Simple pagination metadata (no actual pagination)
  const pagination = useMemo(
    () => ({
      page: 1,
      limit: brandkits.length,
      total: brandkits.length,
      hasNext: false,
      hasPrev: false,
      totalPages: 1,
    }),
    [brandkits.length]
  );

  // Computed values (same as default hook)
  const draftBrandkits = useMemo(
    () => brandkits.filter(isDraftBrandkit),
    [brandkits]
  );

  const publishedBrandkits = useMemo(
    () => brandkits.filter(isPublishedBrandkit),
    [brandkits]
  );

  // Same utilities as default hook for consistent developer experience
  const utils = useMemo(
    () => ({
      findByName: (name: string): Brandkit | undefined => {
        const searchName = name.toLowerCase();
        return brandkits.find(brandkit =>
          getBrandkitDisplayName(brandkit).toLowerCase().includes(searchName)
        );
      },

      filterByStatus: (status: BrandkitStatus): Brandkit[] => {
        return brandkits.filter(brandkit => brandkit.status === status);
      },

      getDisplayNames: (): string[] => {
        return brandkits.map(getBrandkitDisplayName);
      },

      summary: () => {
        const total = brandkits.length;
        const drafts = draftBrandkits.length;
        const published = publishedBrandkits.length;
        const deleted = brandkits.filter(b => b.deletedAt !== null).length;
        const withLogos = brandkits.filter(b => b.logo !== '').length;

        return { total, drafts, published, deleted, withLogos };
      },
    }),
    [brandkits, draftBrandkits, publishedBrandkits]
  );

  return {
    // Core data
    isLoading,
    brandkits,
    error,
    refetch: fetchBrandkits,

    // Computed data
    draftBrandkits,
    publishedBrandkits,
    totalCount: brandkits.length,

    // Pagination
    pagination,

    // Utilities (identical to default hook)
    utils,
  };
}

// Re-export domain utilities for convenience
export {
  isDraftBrandkit,
  isPublishedBrandkit,
  getBrandkitDisplayName,
  type BrandkitStatus,
} from '@sitecore/stream-ui-core';