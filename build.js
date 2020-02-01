const path = require('path');
const { getContentFileInfos, loadPage, md2html, compileTemplate, saveHtml } = require('./src/lib/builder');
const { formatFrontMatter } = require('./src/lib/front-matter-manager');

const config = require('./config');

const CONTENT_DIR = './contents';
const LAYOUT_DIR = './layouts';
const DEST_DIR = './dist';

const fileInfos = getContentFileInfos(CONTENT_DIR);

// let meta = [];

function convert(fileInfo) {
    const { frontMatter, markdown } = loadPage(path.resolve(CONTENT_DIR, fileInfo));

    if (frontMatter.draft) return;

    html = md2html(markdown);

    const template = compileTemplate(frontMatter.layout, LAYOUT_DIR);
    const content = template({ _body: html, _config: config, ...formatFrontMatter(frontMatter) });

    saveHtml(DEST_DIR, fileInfo.replace(/(.+)\.md$/, '$1.html'), content);

    // if (!info.isSimplePage) {
    //     copyAttachment();
    //     meta.push(frontMatter);
    // }
}

for (info of fileInfos) {
    convert(info);
}

// createCategoryList(meta);
// createTagList(meta);

// copyAsset();
