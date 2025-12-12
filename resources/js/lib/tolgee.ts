import { Tolgee, FormatSimple, DevTools } from '@tolgee/react';

export const tolgee = Tolgee()
  .use(FormatSimple())
  .use(DevTools())
  .init({
    language: import.meta.env.VITE_TOLGEE_LANGUAGE || 'en',
    fallbackLanguage: 'en',
    apiUrl: import.meta.env.VITE_TOLGEE_API_URL,
    apiKey: import.meta.env.VITE_TOLGEE_API_KEY,
  });