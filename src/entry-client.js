import createApp from './createApp';

import 'highlight.js/styles/atom-one-dark.css';
import 'katex/dist/katex.css';

const { app, store, router } = createApp();

router.isReady().then(() => {
  if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
  }
  app.mount('#app');
});
