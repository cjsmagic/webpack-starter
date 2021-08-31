const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "[name].bundle.[hash].js",// contenthash based on content change or use [hash] doesnt depend on cache// name is added for avoiding conflict with main and filename
        path: path.resolve(__dirname, "dist")
    },
    plugins: [new HtmlWebpackPlugin({
        template: "./src/template.html",
        minify: {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true,
        }
    }), new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }), new CleanWebpackPlugin()],
    optimization: {
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`,
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ],
    },
    module: {
        rules: [
            {
                test: /.s?css$/,
                use: [MiniCssExtractPlugin.loader,// creates a css file and links to html
                    'css-loader',// loads css
                    'sass-loader']//converts scss to css
            },
        ]
    }
});