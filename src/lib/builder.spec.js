const fs = require('fs');
const mock = require('mock-fs');

const { getContentFileInfos, loadPage, copyAssets } = require('./builder');

describe('getContentFileInfos', () => {
    it('returns page info list and assets', () => {
        mock({
            contents: {
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
            },
        });

        const expectedPages = [
            './contents/simple-page.md',
            './contents/complex-page/index.md',
            './contents/category/simple-page.md',
            './contents/category/complex-page/index.md',
        ];
        const expectedAssets = [
            './contents/complex-page/assets/asset-1.png',
            './contents/complex-page/assets/asset-2.png',
            './contents/category/complex-page/assets/asset-1.png',
            './contents/category/complex-page/assets/asset-2.png',
        ];
        const { pages, assets } = getContentFileInfos('./contents');

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

describe('copyAssets', () => {
    fs.mkdirSync = jest.fn();
    const mkdir = jest.spyOn(fs, 'mkdirSync');

    fs.copyFileSync = jest.fn();
    const copy = jest.spyOn(fs, 'copyFileSync');

    it('make asset directory recursively', () => {
        copyAssets(['./src/path/to/assets/asset-1.png', './src/path/to/assets/asset-2.png'], './src', './dest');

        expect(mkdir).toHaveBeenCalledWith('dest/path');
        expect(mkdir).toHaveBeenCalledWith('dest/path/to');
        expect(mkdir).toHaveBeenCalledWith('dest/path/to/assets');

        expect(copy).toHaveBeenCalledWith('./src/path/to/assets/asset-1.png', 'dest/path/to/assets/asset-1.png');
        expect(copy).toHaveBeenCalledWith('./src/path/to/assets/asset-2.png', 'dest/path/to/assets/asset-2.png');
    });
});
