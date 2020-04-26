const mock = require('mock-fs');

const { getContentFileInfos } = require('./builder');

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
        const pages = getContentFileInfos('./contents');

        expect(pages).toEqual(expect.arrayContaining(expectedPages));
        expect(expectedPages).toEqual(expect.arrayContaining(pages));
    });

    it('ignores unnecessary files', () => {
        mock({
            '.DS_Store': '',
        });

        const pages = getContentFileInfos('./');
        expect(pages).toHaveLength(0);
    });

    afterEach(() => {
        mock.restore();
    });
});
