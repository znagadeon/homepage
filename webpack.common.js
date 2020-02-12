const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/**
 * TODO:
 *  - copy attachment
 *  - sitemap
 *  - rss
 *  - search/category/tag page
 *  - url replace
 */
module.exports = {
    context: __dirname,
    entry: {
        home: './src/home.js',
        post: './src/post.js',
    },

    module: {
        rules: [{
            test: /\.pug$/,
            loader: 'pug-loader',
        }, {
            test: /\.s?css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
                'sass-loader',
            ],
        }],
    },

    plugins: [
        new CleanWebpackPlugin(),
    ],
}
