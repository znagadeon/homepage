import { hydrateRoot } from 'react-dom/client';
import { App } from './App';
import createApp from './vue-app';

const { app: vueApp, store, router } = createApp();

router.isReady().then(() => {
  if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
  }
  vueApp.mount('#vue-app');
});

const app = document.getElementById('app');
if (app) {
  hydrateRoot(app, <App />);
}
