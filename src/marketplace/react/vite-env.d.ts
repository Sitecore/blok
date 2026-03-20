/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AUTH0_DOMAIN?: string;
  readonly VITE_AUTH0_CLIENT_ID?: string;
  readonly VITE_AUTH0_AUDIENCE?: string;
  readonly VITE_AUTH0_SCOPE?: string;
  readonly VITE_SITECORE_APP_ID?: string;
  readonly VITE_APP_BASE_URL?: string;
  readonly VITE_SITECORE_ORGANIZATION_ID?: string;
  readonly VITE_SITECORE_TENANT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
