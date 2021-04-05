import createApp from './app';

export default (context) => {
	return new Promise((resolve) => {
		const { app, store } = createApp(context);

		context.rendered = () => {
            context.state = store.state;
        };

		resolve(app);
	});
}
