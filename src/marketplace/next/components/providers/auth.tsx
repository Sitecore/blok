"use client";

import { useAppContext } from "@/components/providers/marketplace";
import {
  type Auth0ContextInterface,
  Auth0Provider,
  type GetTokenSilentlyOptions,
  useAuth0,
  withAuthenticationRequired,
} from "@auth0/auth0-react";
import { useSearchParams } from "next/navigation";
import type React from "react";

const useSitecoreAuthParams = () => {
  const searchParams = useSearchParams();
  const appContext = useAppContext();
  const organizationId =
    searchParams.get("organizationId") || appContext.organizationId;
  const tenantId =
    searchParams.get("marketplaceAppTenantId") ||
    (typeof appContext.marketplaceAppTenantId === "string" &&
      appContext.marketplaceAppTenantId) ||
    appContext.MarketplaceAppTenantId;

  if (!organizationId || !tenantId) {
    throw new Error(
      "Sitecore organizationId and marketplaceAppTenantId are required in the URL or application context",
    );
  }

  return { organization_id: organizationId, tenant_id: tenantId };
};

export const WithAuth = withAuthenticationRequired(
  ({ children }: { children: React.ReactNode }) => children,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const sitecoreAuthParams = useSitecoreAuthParams();
  const authParams = {
    ...sitecoreAuthParams,
    product_codes: `mkp_${process.env.NEXT_PUBLIC_SITECORE_APP_ID}`,
    audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
    redirect_uri: process.env.NEXT_PUBLIC_APP_BASE_URL,
    scope: process.env.NEXT_PUBLIC_AUTH0_SCOPE,
  };

  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;

  if (!domain || !clientId) {
    throw new Error("Auth0 domain and client ID are required");
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        ...authParams,
      }}
    >
      <WithAuth>{children}</WithAuth>
    </Auth0Provider>
  );
};

export const useAuth = (): Auth0ContextInterface => {
  const { getAccessTokenSilently, ...rest } = useAuth0();
  const sitecoreAuthParams = useSitecoreAuthParams();

  const customGetAccessTokenSilently = (options?: GetTokenSilentlyOptions) => {
    return getAccessTokenSilently({
      ...options,
      authorizationParams: {
        ...options?.authorizationParams,
        ...sitecoreAuthParams,
      },
    });
  };

  return {
    ...rest,
    getAccessTokenSilently:
      customGetAccessTokenSilently as Auth0ContextInterface["getAccessTokenSilently"],
  };
};
