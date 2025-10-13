"use client";

import { GoogleOAuthProvider } from "@react-oauth/google";

export default function GoogleProvider({ children }: { children: React.ReactNode }) {
  const clientId = '902637442804-c9egjfcmufuphkp184g1o1clqucmut6p.apps.googleusercontent.com';

  if (!clientId) {
    console.error("Missing Google Client ID!");
    return <>{children}</>; 
  }

  return <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>;
}