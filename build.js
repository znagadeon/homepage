const path = require('path');
const { getContentFileInfos, loadPage } = require('./src/lib/builder');

const config = getConfig();

const CONTENT_PATH = './contents';
const fileInfos = getContentFileInfos(CONTENT_PATH);

let meta = [];

function convert(fileInfo) {
    const { frontMatter, markdown } = loadPage(path.resolve(CONTENT_PATH, fileInfo.path));
    html = md2html(markdown);

    const template = compile(frontMatter.layout);
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
