import { AuthProvider } from "@/components/providers/auth";
import { MarketplaceProvider } from "@/components/providers/marketplace";
import type { ReactNode } from "react";

/**
 * Wrap your Vite app root with this instead of only {@link MarketplaceProvider}
 * when using the custom Auth0 SPA flow from the registry quickstart-with-custom-auth block.
 */
export function MarketplaceAppProvidersWithCustomAuth({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AuthProvider>
      <MarketplaceProvider>{children}</MarketplaceProvider>
    </AuthProvider>
  );
}
