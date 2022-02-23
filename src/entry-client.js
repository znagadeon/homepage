import createApp from './app';

const { app, router } = createApp();

router.isReady().then(() => {
	app.mount('#app', true);
});

// router.onReady(() => {
// 	if (window.__INITIAL_STATE__) {
// 		store.replaceState(window.__INITIAL_STATE__);
// 	}

// 	app.mount('#app', true);
// });
