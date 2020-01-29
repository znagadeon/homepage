const config = getConfig();

const postPathList = getPostList();
const pagePathList = getPageList();

let meta = [];

function convert(path, isPost) {
    const { frontMatter, markdown } = isPost ? loadPost(path) : loadPage(path);
    html = md2html(markdown);

    const template = compile(frontMatter.layout);
    const content = template(html, { _config: config, ...frontMatter });

    saveHtml(content);

    if (isPost) {
        copyAttachment();
        meta.push(frontMatter);
    }
}

for (path of postPathList) {
    convert(path, true);
}

for (path of pagePathList) {
    convert(path, false);
}

createCategoryList(meta);
createTagList(meta);

copyAsset();
