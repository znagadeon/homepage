import createApp from './app';

const { app, store, router } = createApp();

router.isReady().then(() => {
	if (window.__INITIAL_STATE__) {
		store.replaceState(window.__INITIAL_STATE__);
	}
	app.mount('#app');
});
