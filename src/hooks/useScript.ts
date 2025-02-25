import { useEffect } from 'react';

type Attribute = Partial<{
  async: boolean;
  data: Record<string, string | number | boolean>;
  crossOrigin: string;
}>;

export const useScript = (src: string, attr?: Attribute) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = src;

    if (attr?.async) {
      script.async = attr.async;
    }

    if (attr?.crossOrigin) {
      script.crossOrigin = attr.crossOrigin;
    }

    if (attr?.data) {
      Object.entries(attr.data).forEach(([key, value]) => {
        script.setAttribute(`data-${key}`, value.toString());
      });
    }

    document.body.append(script);
  }, [src, attr]);
};
