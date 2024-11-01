// src/auth/authConfig.ts

export const authConfig = {
    domain: import.meta.env.VITE_AUTH_DOMAIN,
    clientId: import.meta.env.VITE_AUTH_CLIENT_ID,
    authorizationParams: {
        redirect_uri: window.location.origin.endsWith('/') ? window.location.origin : window.location.origin + '/',
        scope: "openid profile email",
        audience: import.meta.env.VITE_AUTH_AUDIENCE
      }
  };
