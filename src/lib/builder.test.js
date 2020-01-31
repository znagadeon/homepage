const mock = require('mock-fs');

const { getContentFileInfos, loadPage, compileTemplate } = require('./builder');

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
            'page.md': '---\nlayout: test\n---\n\n# content',
        });

        expect(loadPage('./page.md')).toEqual({
            markdown: '# content',
            frontMatter: {
                layout: 'test',
            },
        });
    });

    it('returns empty markdown string if content after front matter does not exists', () => {
        mock({
            'page.md': '---\nlayout: test\n---\n\n',
        });

        expect(loadPage('./page.md')).toEqual({
            markdown: '',
            frontMatter: {
                layout: 'test',
            },
        });
    });

    it ('throws error if front matter does not have `layout`', () => {
        mock({
            'page-with-no-layout-info.md': '---\n---\n\n# content',
        });

        expect(() => {
            loadPage('./page-with-no-layout-info.md');
        }).toThrow();
    });

    afterEach(() => {
        mock.restore();
    });
});
