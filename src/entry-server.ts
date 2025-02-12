import { renderToString } from 'vue/server-renderer';
import createApp from './vue-app';

// biome-ignore lint/suspicious/noExplicitAny:
export const render = async (url: string, manifest: any = {}) => {
  const { app, router, store } = createApp();

  await router.push(url);
  await router.isReady();

  return {
    vueSsr: await renderToString(app, manifest),
    manifest,
    state: store.state,
  };
};
