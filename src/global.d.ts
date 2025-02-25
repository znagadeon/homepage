declare module '*.scss';

interface ImportMeta {
  env: {
    SSR: boolean;
    MODE: 'development' | 'production';
  };
}
