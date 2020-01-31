const { getContentFileInfos } = require('./src/lib/builder');

const config = getConfig();

const fileInfos = getContentFileInfos('./contents');

let meta = [];

function convert(fileInfo) {
    const { frontMatter, markdown } = isSimplePage ? loadPost(fileInfo.path) : loadPage(fileInfo.path);
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
