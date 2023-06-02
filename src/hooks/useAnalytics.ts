import { googleAnalytics } from '@root/config';
import { useScript } from './useScript';

export const useAnalytics = () => {
  useScript({
    appendTo: 'head',
    async: true,
    src: `https://www.googletagmanager.com/gtag/js?id=${googleAnalytics}`,
    callback: () => {
      if (import.meta.env.MODE === 'development') return;
      window.dataLayer = window.dataLayer || [];
      const gtag = (...params: (Date | string)[]) => {
        window.dataLayer.push(params);
      };
      gtag('js', new Date());
      gtag('config', googleAnalytics);
    },
  });
};
