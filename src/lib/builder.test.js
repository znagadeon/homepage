const fs = require('fs');
const mock = require('mock-fs');

const { getContentFileInfos, loadPage, saveHtml } = require('./builder');

// FIXME: mock-fs does not support { withFileTypes: true } yet
xdescribe('getContentFileInfos', () => {
    it('returns page info list', () => {
        mock({
            'simple-page.md': '',
            'complex-page': {
                'index.md': '',
            },
            category: {
                'simple-page.md': '',
                'complex-page': {
                    'index.md': '',
                },
            },
        });

        const expected = [
            './simple-page.md',
            './complex-page/index.md',
            './category/simple-page.md',
            './category/complex-page/index.md',
        ];
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
                path: './page.md',
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
                path: './page.md',
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

describe('saveHtml', () => {
    fs.writeFileSync = jest.fn();
    const write = jest.spyOn(fs, 'writeFileSync');

    fs.mkdirSync = jest.fn();
    const mkdir = jest.spyOn(fs, 'mkdirSync');

    it('saves page into destination directory', () => {
        saveHtml('./dist', 'test.html', '');
        expect(write).toHaveBeenCalledWith('./dist/test.html', '');
    });

    it('creates directories recursively if path is not a single filename', () => {
        saveHtml('./dist', 'parent/dir/test.html', '');
        expect(mkdir).toHaveBeenCalledWith('./dist/parent');
        expect(mkdir).toHaveBeenCalledWith('./dist/parent/dir');
        expect(mkdir).not.toHaveBeenCalledWith('./dist/parent/dir/test.html', '');
        expect(write).toHaveBeenCalledWith('./dist/parent/dir/test.html', '');
    })
});
