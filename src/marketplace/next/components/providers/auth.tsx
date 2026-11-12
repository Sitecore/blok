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
import { createContext, useContext } from "react";
import type React from "react";

type SitecoreAuthParams = {
  organization_id: string;
  tenant_id: string;
};

const SitecoreAuthParamsContext = createContext<SitecoreAuthParams | null>(
  null,
);

const useSitecoreAuthParams = (): SitecoreAuthParams | null => {
  const searchParams = useSearchParams();
  const appContext = useAppContext();
  const organizationId =
    appContext.organizationId || searchParams.get("organizationId");
  const tenantId =
    appContext.MarketplaceAppTenantId ||
    (typeof appContext.marketplaceAppTenantId === "string" &&
      appContext.marketplaceAppTenantId) ||
    searchParams.get("marketplaceAppTenantId");

  if (!organizationId || !tenantId) {
    return null;
  }

  return { organization_id: organizationId, tenant_id: tenantId };
};

export const WithAuth = withAuthenticationRequired(
  ({ children }: { children: React.ReactNode }) => children,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const sitecoreAuthParams = useSitecoreAuthParams();
  if (!sitecoreAuthParams) {
    return (
      <div>
        Unable to initialize authentication. Please verify that the application
        is launched from Sitecore Marketplace.
      </div>
    );
  }

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
    <SitecoreAuthParamsContext.Provider value={sitecoreAuthParams}>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          ...authParams,
        }}
      >
        <WithAuth>{children}</WithAuth>
      </Auth0Provider>
    </SitecoreAuthParamsContext.Provider>
  );
};

export const useAuth = (): Auth0ContextInterface => {
  const sitecoreAuthParams = useContext(SitecoreAuthParamsContext);
  const { getAccessTokenSilently, ...rest } = useAuth0();

  if (!sitecoreAuthParams) {
    throw new Error("useAuth must be used within AuthProvider");
  }

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
