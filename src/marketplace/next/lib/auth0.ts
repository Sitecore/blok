// lib/auth0.js
import { Auth0Client } from "@auth0/nextjs-auth0/server";

// Initialize the Auth0 client 
export const auth0 = new Auth0Client({
  // Options are loaded from environment variables by default
  // Ensure necessary environment variables are properly set
  session:{
    cookie:{
      sameSite: "none",
      secure: true,
    }
  },
  transactionCookie:{
    sameSite: "none",
    secure: true,
  },
  authorizationParameters: {
    scope: process.env.AUTH0_SCOPE,
    audience: process.env.AUTH0_AUDIENCE,
    redirect_uri: process.env.APP_BASE_URL,
    product_codes: `mkp_${process.env.APP_ID}`,
    organization_id: process.env.SITECORE_ORGANIZATION_ID,
    tenant_id: process.env.SITECORE_TENANT_ID,
  }
});