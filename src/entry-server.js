import createApp from './app';

export default (context) => {
	return new Promise((resolve) => {
		const { app, store, router } = createApp();

		router.push(context.url);

		router.onReady(() => {
			context.rendered = () => {
				context.state = store.state;
			};

			resolve(app);
		});
	});
}
