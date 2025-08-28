/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAILERLITE_API_KEY: string;
  readonly VITE_MAILERLITE_GROUP_ID: string;
  readonly VITE_MAILERLITE_CONTENT_CREATOR_GROUP_ID: string;
  readonly VITE_MAILERLITE_GETTING_THERE_GROUP_ID: string;
  readonly VITE_MAILERLITE_CONVERSION_PRO_GROUP_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}