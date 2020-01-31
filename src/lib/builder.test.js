const mock = require('mock-fs');

const { getContentFileInfos, loadPage } = require('./builder');

describe('getContentFileInfos', () => {
    it('returns page info list', () => {
        mock({
            'simple-page.md': '',
            'complex-page': {
                'index.md': '',
            },
        });

        const expected = [{
            title: 'simple-page',
            path: 'simple-page.md',
            isSimplePage: true,
        }, {
            title: 'complex-page',
            path: 'complex-page/index.md',
            isSimplePage: false,
        }];
        const results = getContentFileInfos('./');

        expect(results).toEqual(expect.arrayContaining(expected));
        expect(expected).toEqual(expect.arrayContaining(results));
    });

    afterEach(() => {
        mock.restore();
    });
});

describe('loadPage', () => {
    it('returns object which contains markdown and front matter', () => {
        mock({
            'page.md': '---\nkey: value\n---\n\n# content',
        });

        expect(loadPage('./page.md')).toEqual({
            markdown: '# content',
            frontMatter: {
                key: 'value',
            },
        });
    });

    it('returns empty front matter object if front matter does not exist', () => {
        mock({
            'page-with-no-front-matter.md': '# content',
            'page-with-empty-front-matter.md': '---\n---\n\n# content',
        });

        expect(loadPage('./page-with-no-front-matter.md')).toEqual({
            markdown: '# content',
            frontMatter: {},
        });

        expect(loadPage('./page-with-empty-front-matter.md')).toEqual({
            markdown: '# content',
            frontMatter: {},
        });
    });

    it('returns empty markdown string if content after front matter does not exists', () => {
        mock({
            'page.md': '---\nkey: value\n---\n\n',
        });

        expect(loadPage('./page.md')).toEqual({
            markdown: '',
            frontMatter: {
                key: 'value',
            },
        });
    });

    afterEach(() => {
        mock.restore();
    });
});
