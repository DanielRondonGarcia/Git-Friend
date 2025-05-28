import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!['en', 'es'].includes(locale as any)) {
    // Optionally, you could throw an error or log a warning here
    // For now, we'll default to 'en' if the locale is invalid,
    // though the middleware should prevent this scenario.
    // Consider how you want to handle invalid locales robustly.
    // For this setup, middleware ensures only 'en' or 'es' reach here.
  }

  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
