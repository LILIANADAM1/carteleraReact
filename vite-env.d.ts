/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  readonly VITE_API_KEY_SHORT: string;
  readonly VITE_AUTH0_DOMAIN: string;
  readonly VITE_AUTH0_CLIENT_ID: string;
  // Puedes añadir más variables si las usas, por ejemplo:
  // readonly VITE_OTRA_VAR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
