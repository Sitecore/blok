"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ApplicationContext, ClientSDK } from "@sitecore-marketplace-sdk/client";
// import { XMC } from "@sitecore-marketplace-sdk/xmc";

interface MarketplaceProviderProps {
  children: ReactNode;
}

type MarketplaceContextValue = {
  client: ClientSDK;
  appContext: ApplicationContext;
};

const MarketplaceContext = createContext<MarketplaceContextValue | null>(null);

export const MarketplaceProvider: React.FC<MarketplaceProviderProps> = ({
  children,
}) => {
  const [client, setClient] = useState<ClientSDK | null>(null);
  const [appContext, setAppContext] = useState<ApplicationContext | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      const config = {
        target: window.parent,
        // Enable if your app uses XMC APIs
        // modules: [XMC]
      };
      try {
        setLoading(true);
        setError(null);
        
        // Initialize client
        const initializedClient = await ClientSDK.init(config);
        setClient(initializedClient);
        
        // Immediately query for application context after initialization
        const res = await initializedClient.query("application.context");
        
        if (res && res.data) {
          setAppContext(res.data);
        } else {
          setError("Failed to fetch application context");
        }
      } catch (error) {
        console.error("Error initializing Marketplace SDK", error);
        setError(
          error instanceof Error
            ? `Error initializing Marketplace SDK: ${error.message}`
            : "Error initializing Marketplace SDK"
        );
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  if (error) {
    return (
      <div>
        <h1>Error initializing Marketplace SDK</h1>
        <div>{error}</div>
        <div>
          Please check if the client SDK is loaded inside Sitecore Marketplace
          parent window and you have properly set your app's extension points.
        </div>
      </div>
    );
  }

  if (loading) {
    return <div>Attempting to connect to Sitecore Marketplace...</div>;
  }

  if (!client || !appContext) {
    return null;
  }

  const value = useMemo(
    () => ({ client, appContext }),
    [client, appContext]
  );

  return (
    <MarketplaceContext.Provider value={value}>
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplaceClient = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error("useMarketplaceClient must be used within a MarketplaceProvider");
  }
  return context.client;
};

export const useAppContext = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error("useAppContext must be used within a MarketplaceProvider");
  }
  return context.appContext;
};