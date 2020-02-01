const { formatFrontMatter } = require('./front-matter-manager');

describe('formatFrontMatter', () => {
    it('format published date', () => {
        const datetime = new Date('2020-02-01T18:16:00+09:00');

        expect(formatFrontMatter({
            published: datetime,
        })).toEqual({
            published: '2020-02-01',
        });
    });
});
