const mock = require('mock-fs');

const { getContentFileInfos } = require('./builder');

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
