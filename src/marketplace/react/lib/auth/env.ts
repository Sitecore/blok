export function getAuth0ClientEnv(): { domain: string; clientId: string } {
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  if (!domain || !clientId) {
    throw new Error(
      "Auth0 domain and client ID are required (VITE_AUTH0_DOMAIN, VITE_AUTH0_CLIENT_ID)",
    );
  }
  return { domain, clientId };
}

export function getAuth0AuthorizationParams(): Record<string, string | undefined> {
  const appId = import.meta.env.VITE_SITECORE_APP_ID;
  return {
    organization_id: import.meta.env.VITE_SITECORE_ORGANIZATION_ID,
    tenant_id: import.meta.env.VITE_SITECORE_TENANT_ID,
    product_codes: appId ? `mkp_${appId}` : undefined,
    audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    redirect_uri: import.meta.env.VITE_APP_BASE_URL,
    scope: import.meta.env.VITE_AUTH0_SCOPE,
  };
}

/** Passed through to silent token calls (organization / tenant). */
export function getSitecoreTokenParams(): Record<string, string | undefined> {
  return {
    organization_id: import.meta.env.VITE_SITECORE_ORGANIZATION_ID,
    tenant_id: import.meta.env.VITE_SITECORE_TENANT_ID,
  };
}
