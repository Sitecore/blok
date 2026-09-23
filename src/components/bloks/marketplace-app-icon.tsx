"use client";

import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export const MARKETPLACE_APP_ICON_FALLBACK_COLORS = [
  "teal",
  "cyan",
  "yellow",
  "pink",
  "green",
  "purple",
] as const;

export type MarketplaceAppIconFallbackColor =
  (typeof MARKETPLACE_APP_ICON_FALLBACK_COLORS)[number];

export type MarketplaceAppIconSize = "xs" | "sm" | "md" | "lg" | "xlg";

const marketplaceAppIconVariants = cva(
  "relative shrink-0 overflow-hidden border border-black/[0.03]",
  {
    variants: {
      size: {
        xs: "size-6 rounded-md",
        sm: "size-8 rounded-lg",
        md: "size-10 rounded-lg",
        lg: "size-14 rounded-xl",
        xlg: "size-20 rounded-xl",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  },
);

const marketplaceAppIconFallbackVariants = cva(
  "rounded-[inherit] font-semibold text-inverse-text leading-none",
  {
    variants: {
      size: {
        xs: "text-base",
        sm: "text-base",
        md: "text-xl",
        lg: "text-xl",
        xlg: "text-3xl",
      },
      fallbackColor: {
        teal: "bg-teal-500",
        cyan: "bg-cyan-500",
        yellow: "bg-yellow-500",
        pink: "bg-pink-500",
        green: "bg-green-500",
        purple: "bg-purple-500",
      },
    },
    defaultVariants: {
      size: "sm",
      fallbackColor: "teal",
    },
  },
);

function hashSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return hash;
}

/**
 * Deterministically pick a fallback palette color from a stable seed
 * (prefer app id via `colorSeed`, otherwise the application name).
 */
export function getMarketplaceAppIconFallbackColor(
  seed: string,
): MarketplaceAppIconFallbackColor {
  const normalized = seed.trim().toLocaleLowerCase();
  if (!normalized) {
    return MARKETPLACE_APP_ICON_FALLBACK_COLORS[0];
  }

  const index =
    hashSeed(normalized) % MARKETPLACE_APP_ICON_FALLBACK_COLORS.length;
  return MARKETPLACE_APP_ICON_FALLBACK_COLORS[index];
}

function getFallbackLetter(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) {
    return "?";
  }
  return trimmed[0].toLocaleUpperCase();
}

export type MarketplaceAppIconProps = Omit<
  React.ComponentProps<typeof Avatar>,
  "children" | "color"
> &
  VariantProps<typeof marketplaceAppIconVariants> & {
    /** Application display name — drives fallback letter and stable color. */
    name: string;
    /** Image URL. If omitted or load fails, shows the letter fallback. */
    src?: string | null;
    /** Accessible label; defaults to `name`. */
    alt?: string;
    /**
     * Optional stable key for color hashing when `name` can change
     * (e.g. application id). Prefer this in production.
     */
    colorSeed?: string;
    /** Force a palette color; skips hashing. Useful for docs. */
    fallbackColor?: MarketplaceAppIconFallbackColor;
  };

function MarketplaceAppIcon({
  name,
  src,
  alt,
  size = "sm",
  colorSeed,
  fallbackColor,
  className,
  ...props
}: MarketplaceAppIconProps) {
  const resolvedSrc = src?.trim() || undefined;
  const resolvedFallbackColor =
    fallbackColor ?? getMarketplaceAppIconFallbackColor(colorSeed ?? name);
  const letter = getFallbackLetter(name);
  const label = alt ?? name;

  return (
    <Avatar
      data-slot="marketplace-app-icon"
      aria-label={label}
      className={cn(marketplaceAppIconVariants({ size }), className)}
      {...props}
    >
      {resolvedSrc ? (
        <AvatarImage src={resolvedSrc} alt="" className="object-cover" />
      ) : null}
      <AvatarFallback
        className={marketplaceAppIconFallbackVariants({
          size,
          fallbackColor: resolvedFallbackColor,
        })}
      >
        <span aria-hidden="true">{letter}</span>
      </AvatarFallback>
    </Avatar>
  );
}

export {
  MarketplaceAppIcon,
  marketplaceAppIconVariants,
  marketplaceAppIconFallbackVariants,
};
