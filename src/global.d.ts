declare module '*.scss';

interface Window {
  __JOTAI_STATE__: Map;
}

interface ImportMeta {
  env: {
    SSR: boolean;
    MODE: 'development' | 'production';
  };
}
