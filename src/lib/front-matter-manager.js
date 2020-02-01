const formatISO = require('date-fns/formatISO');

module.exports = {
    formatFrontMatter: fm => ({
        ...fm,
        ...(fm.published ? {
            published: formatISO(fm.published, { representation: 'date' })
        } : {}),
    }),
};
