import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation'; // Make sure to import this

const validLocales = ['en', 'es']; // Or read from middleware config if preferred

export default getRequestConfig(async ({locale}) => {
  let finalLocale = locale;

  if (!validLocales.includes(locale as any)) {
    console.warn(`[Custom i18n.ts] Invalid or undefined locale "${locale}" received. Defaulting to 'en'.`);
    finalLocale = 'en';
  }

  // Paranoid check, in case defaultLocale from middleware was somehow not in validLocales
  if (!validLocales.includes(finalLocale)) {
      console.error(`[Custom i18n.ts] Critical: Locale "${finalLocale}" is still invalid after attempting to default. Forcing 'en'.`);
      finalLocale = 'en';
  }

  try {
    const messages = (await import(`./messages/${finalLocale}.json`)).default;
    return {
      messages: messages,
      // Ensure the locale is also returned as per previous fixes for "No locale was returned"
      locale: finalLocale
    };
  } catch (error) {
    console.error(`[Custom i18n.ts] Failed to load messages for locale "${finalLocale}": ${error}`);
    if (finalLocale !== 'en') {
        console.warn(`[Custom i18n.ts] Attempting to load 'en' messages as fallback.`);
        try {
            const fallbackMessages = (await import('./messages/en.json')).default;
            return {
                messages: fallbackMessages,
                locale: 'en' // Return 'en' as the locale for fallback
            };
        } catch (fallbackError) {
            console.error(`[Custom i18n.ts] Failed to load fallback 'en' messages: ${fallbackError}`);
            notFound();
        }
    }
    // If finalLocale was 'en' and failed, or if fallback for other locale failed
    notFound();
  }
});
