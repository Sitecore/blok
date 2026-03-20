import {
  type Auth0ContextInterface,
  Auth0Provider,
  type GetTokenSilentlyOptions,
  useAuth0,
  withAuthenticationRequired,
} from "@auth0/auth0-react";
import {
  getAuth0AuthorizationParams,
  getAuth0ClientEnv,
  getSitecoreTokenParams,
} from "@/lib/auth/env";
import type React from "react";

export const WithAuth = withAuthenticationRequired(
  ({ children }: { children: React.ReactNode }) => children,
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { domain, clientId } = getAuth0ClientEnv();
  const authParams = getAuth0AuthorizationParams();

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
  const sitecoreParams = getSitecoreTokenParams();

  const customGetAccessTokenSilently = (options?: GetTokenSilentlyOptions) => {
    return getAccessTokenSilently({
      ...options,
      authorizationParams: {
        ...options?.authorizationParams,
        ...sitecoreParams,
      },
    });
  };

  return {
    ...rest,
    getAccessTokenSilently:
      customGetAccessTokenSilently as Auth0ContextInterface["getAccessTokenSilently"],
  };
};
