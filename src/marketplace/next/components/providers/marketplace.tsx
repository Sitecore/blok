"use client";

import {
  type ApplicationContext,
  ClientSDK,
} from "@sitecore-marketplace-sdk/client";
import type React from "react";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
// import { XMC } from "@sitecore-marketplace-sdk/xmc";

interface ClientSDKProviderProps {
  children: ReactNode;
}

const NOT_EMBEDDED_ERROR =
  "This app is not running inside Sitecore. Open it from the extension point it is installed in.";

const ClientSDKContext = createContext<ClientSDK | null>(null);
const AppContextContext = createContext<ApplicationContext | null>(null);

export const MarketplaceProvider: React.FC<ClientSDKProviderProps> = ({
  children,
}) => {
  const [client, setClient] = useState<ClientSDK | null>(null);
  const [appContext, setAppContext] = useState<ApplicationContext | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (client) {
      client.query("application.context").then((res) => {
        if (res?.data) {
          setAppContext(res.data);
          console.log("appContext", res.data);
        }
      });
    }
  }, [client]);

  useEffect(() => {
    const init = async () => {
      // Outside an iframe there is no Sitecore host to handshake with, so fail
      // fast instead of waiting for the SDK handshake to time out.
      if (window.parent === window) {
        setError(NOT_EMBEDDED_ERROR);
        setLoading(false);
        return;
      }
      const config = {
        target: window.parent,
        // Enable if your app uses XMC APIs
        // modules: [XMC]
      };
      try {
        setLoading(true);
        const client = await ClientSDK.init(config);
        setClient(client);
      } catch (error) {
        console.error("Error initializing client SDK", error);
        setError("Error initializing client SDK");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  if (loading) {
    return <div>Attempting to connect to Sitecore Marketplace...</div>;
  }

  if (error) {
    return (
      <div>
        <h1>Error initializing Marketplace SDK</h1>
        <div>{error}</div>
        <div>
          Please check if the client SDK is loaded inside Sitecore Marketplace
          parent window and you have properly set your app&apos;s extension
          points.
        </div>
      </div>
    );
  }

  if (!client) {
    return null;
  }

  if (!appContext) {
    return null;
  }

  return (
    <ClientSDKContext.Provider value={client}>
      <AppContextContext.Provider value={appContext}>
        {children}
      </AppContextContext.Provider>
    </ClientSDKContext.Provider>
  );
};

export const useMarketplaceClient = () => {
  const context = useContext(ClientSDKContext);
  if (!context) {
    throw new Error(
      "useMarketplaceClient must be used within a ClientSDKProvider",
    );
  }
  return context;
};

export const useAppContext = () => {
  const context = useContext(AppContextContext);
  if (!context) {
    throw new Error("useAppContext must be used within a ClientSDKProvider");
  }
  return context;
};
