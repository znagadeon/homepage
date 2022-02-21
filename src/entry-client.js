import createApp from './app';

// const { app, store, router } = createApp();
const { app } = createApp();

app.mount('#app', false);

// router.onReady(() => {
// 	if (window.__INITIAL_STATE__) {
// 		store.replaceState(window.__INITIAL_STATE__);
// 	}

// 	app.mount('#app', true);
// });
