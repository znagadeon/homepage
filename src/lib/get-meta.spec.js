const mock = require('mock-fs');

const getMeta = require('./get-meta');

describe('getMeta', () => {
	it('returns meta info', () => {
		mock({
			'index.md': '---\ntitle: test\ndraft: true\n---\n\n# test',
		});

		expect(getMeta('index.md')).toEqual({
			meta: {
				title: 'test',
				draft: true,
			},
			content: '# test',
		});
	});

	afterEach(() => {
		mock.restore();
	});
});
