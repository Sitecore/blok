"use client";

import { useEffect } from "react";

function ensureAnonymousUserId(): string | null {
  if (typeof window === "undefined") return null;

  const storageKey = "pxAnonUserId";

  try {
    let id = window.localStorage.getItem(storageKey);
    if (!id) {
      if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
        id = crypto.randomUUID();
      } else {
        id = `anon-${Date.now()}-${Math.random().toString(16).slice(2)}`;
      }
      window.localStorage.setItem(storageKey, id);
    }
    return id;
  } catch {
    return null;
  }
}

export function GainsightProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof window === "undefined" || !window.aptrinsic) return;

    const anonId = ensureAnonymousUserId();
    if (anonId) {
      window.aptrinsic("identify", {
        // id: anonId,
        plan: "blok_docs_anonymous",
        source: "blok-site",
      });
    }

    window.aptrinsic("set", "globalContext", {
      App: "Blok Docs",
      Hostname: window.location.hostname,
    });
  }, []);

  return <>{children}</>;
}
