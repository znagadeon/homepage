import { describe, it, afterEach, expect } from 'vitest';

const mock = require('mock-fs');

const getMeta = require('./get-meta');
const { md2html } = require('./md-converter');

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
			content: md2html('# test'),
		});
	});

	afterEach(() => {
		mock.restore();
	});
});
