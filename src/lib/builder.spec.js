const fs = require('fs');
const mock = require('mock-fs');

const { getContentFileInfos, loadPage } = require('./builder');

describe('getContentFileInfos', () => {
    it('returns page info list and assets', () => {
        mock({
            'simple-page.md': '',
            'complex-page': {
                assets: {
                    'asset-1.png': '',
                    'asset-2.png': '',
                },
                'index.md': '',
            },
            category: {
                'simple-page.md': '',
                'complex-page': {
                    assets: {
                        'asset-1.png': '',
                        'asset-2.png': '',
                    },
                    'index.md': '',
                },
            },
        });

        const expectedPages = [
            './simple-page.md',
            './complex-page/index.md',
            './category/simple-page.md',
            './category/complex-page/index.md',
        ];
        const expectedAssets = [
            './complex-page/assets/asset-1.png',
            './complex-page/assets/asset-2.png',
            './category/complex-page/assets/asset-1.png',
            './category/complex-page/assets/asset-2.png',
        ];
        const { pages, assets } = getContentFileInfos('./');

        expect(pages).toEqual(expect.arrayContaining(expectedPages));
        expect(expectedPages).toEqual(expect.arrayContaining(pages));
        
        expect(assets).toEqual(expect.arrayContaining(expectedAssets));
        expect(expectedAssets).toEqual(expect.arrayContaining(assets));
    });

    it('ignores unnecessary files', () => {
        mock({
            '.DS_Store': '',
        });

        const { pages, assets } = getContentFileInfos('./');
        expect(pages).toHaveLength(0);
        expect(assets).toHaveLength(0);
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
