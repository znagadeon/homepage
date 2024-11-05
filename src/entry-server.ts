import { renderToString } from 'vue/server-renderer';
import createApp from './app';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const render = async (url: string, manifest: any = {}) => {
  const { app, router, store } = createApp();

  await router.push(url);
  await router.isReady();

  return {
    ssr: await renderToString(app, manifest),
    manifest,
    state: store.state,
  };
};
