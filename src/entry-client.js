import createApp from './app';

const { app, store, router } = createApp();

router.onReady(() => {
	if (window.__INITIAL_STATE__) {
		store.replaceState(window.__INITIAL_STATE__);
	}

	app.mount('#app', true);
});
