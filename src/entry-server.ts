import { renderToString } from 'vue/server-renderer';
import createApp from './app';

export const render = async (url: string) => {
  const { app, router, store } = createApp();

  await router.push(url);
  await router.isReady();

  return {
    ssr: await renderToString(app),
    state: store.state,
  };
};