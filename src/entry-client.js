import createApp from './createApp';

import 'highlight.js/styles/atom-one-dark.css';
import 'katex/dist/katex.css';

const { app, router } = createApp();

router.isReady().then(() => {
  app.mount('#app');
});
