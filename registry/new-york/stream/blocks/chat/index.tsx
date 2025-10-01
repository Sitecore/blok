"use client"

import React from "react"
import { Provider as JotaiProvider } from "jotai"

import { type Session } from "./store/types"
import { ChatContext } from "./streamContexts"

import "../../stream.css"

const baseUrlEnv = {
  dev: "-dev.sitecore-staging.cloud",
  qa: "-qa.sitecore-staging.cloud",
  staging: "-staging.sitecore-staging.cloud",
  preprod: "-preprod.sitecorecloud.io",
  prod: "sitecorecloud.io",
}

export interface ChatProps {
  session: Omit<Session, "apiEnv">
  children?: React.ReactNode
}

export function Chat({ session, children }: ChatProps) {
  const apiEnv = `${session.region}${baseUrlEnv[session.env]}`

  return (
    <ChatContext.Provider value={{ session: { ...session, apiEnv } }}>
      <JotaiProvider>{children}</JotaiProvider>
    </ChatContext.Provider>
  )
}
