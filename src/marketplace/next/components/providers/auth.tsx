"use client";

import React from "react";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const authParams = {
    organization_id: process.env.NEXT_PUBLIC_SITECORE_ORGANIZATION_ID,
    tenant_id: process.env.NEXT_PUBLIC_SITECORE_TENANT_ID,
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
      {children}
    </Auth0Provider>
  );
};

export const useAuth = () => {
  const { getAccessTokenSilently, ...rest } = useAuth0();
  // custom getAccessTokenSilently to add organization_id and tenant_id
  // required for refresh token flow
  const customGetAccessTokenSilently = async () => {
    const token = await getAccessTokenSilently({
      authorizationParams: {
        organization_id: process.env.NEXT_PUBLIC_SITECORE_ORGANIZATION_ID,
        tenant_id: process.env.NEXT_PUBLIC_SITECORE_TENANT_ID,
      },
    });
    return token;
  };
  return { ...rest, getAccessTokenSilently: customGetAccessTokenSilently };
};
