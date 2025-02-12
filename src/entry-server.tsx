import { renderToString } from 'react-dom/server';
import { renderToString as renderVue } from 'vue/server-renderer';
import { App } from './App';
import createVueApp from './vue-app';

// biome-ignore lint/suspicious/noExplicitAny:
export const render = async (url: string, manifest: any = {}) => {
  const { app, router, store } = createVueApp();

  await router.push(url);
  await router.isReady();

  return {
    vueSsr: await renderVue(app, manifest),
    ssr: renderToString(<App />),
    manifest,
    state: store.state,
  };
};
