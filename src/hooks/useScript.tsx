import { useEffect } from 'react';

type Params = {
  appendTo: 'head' | 'body';
  src: string;
  async?: boolean;
  crossOrigin?: 'anonymous' | 'use-credentials' | '';
  dataset?: Record<string, string>;
  callback?: () => void;
};

export const useScript = ({ appendTo, src, dataset, callback, ...rest }: Params) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = src;

    const _dataset = Object.entries(dataset ?? {});
    _dataset.forEach(([key, value]) => {
      script.dataset[key] = value;
    });

    Object.entries(rest).forEach(([key, value]) => {
      if (typeof value === 'boolean') {
        value && script.setAttribute(key, '');
        return;
      }
      script.setAttribute(key, value);
    });

    if (appendTo === 'head') {
      document.head.append(script);
    } else {
      document.body.append(script);
    }

    callback?.();
  }, []);
};
