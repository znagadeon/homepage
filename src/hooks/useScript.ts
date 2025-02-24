import { type HTMLAttributes, useEffect } from 'react';

type Attribute = {
  async: boolean;
};

export const useScript = (src: string, attr?: Attribute) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = src;
    script.async = attr?.async || false;

    document.body.append(script);
  }, [src, attr]);
};
