const path = require('path');
const { getContentFileInfos, loadPage, md2html, compileTemplate } = require('./src/lib/builder');

const config = getConfig();

const CONTENT_DIR = './contents';
const LAYOUT_DIR = './layouts';

const fileInfos = getContentFileInfos(CONTENT_DIR);

let meta = [];

function convert(fileInfo) {
    const { frontMatter, markdown } = loadPage(path.resolve(CONTENT_DIR, fileInfo.path));
    html = md2html(markdown);

    const template = compileTemplate(frontMatter.layout, LAYOUT_DIR);
    const content = template(html, { _config: config, ...frontMatter });

    saveHtml(content);

    if (!info.isSimplePage) {
        copyAttachment();
        meta.push(frontMatter);
    }
}

for (info of fileInfos) {
    convert(info);
}

createCategoryList(meta);
createTagList(meta);

copyAsset();
