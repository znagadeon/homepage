import { googleAnalytics } from '@root/config';

export const runGoogleAnalytics = () => {
  if (import.meta.env.MODE === 'development') return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalytics}`;

  document.head.append(script);

  window.dataLayer = window.dataLayer || [];
  const gtag = (...params: (Date | string)[]) => {
    window.dataLayer.push(params);
  };
  gtag('js', new Date());
  gtag('config', googleAnalytics);
};
