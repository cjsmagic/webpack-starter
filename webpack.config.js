const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    mode: "development",// development | production
    watch: true,// can be enabled to rebuild dist but needs browser manual reload
    entry: {
        main: "./src/index.js",// custom js
        vendor: './src/vendor.js'// vendor js 
    },
    output: {
        filename: "[name].bundle.[contentHash].js",// contenthash based on content change or use [hash] doesnt depend on cache
        path: path.resolve(__dirname, "dist")
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),// css minification
            new TerserPlugin(),//file size reducer
        ],
    },
    plugins: [new HtmlWebpackPlugin({
        //create index.html in dist and adds hashed bundle scripts to it dynamically
        // template to add js , css links
        template: "./src/template.html",
        //cleaning of code
        minify: {
            removeAttributeQuotes: true,
            collapseWhitespace: true,
            removeComments: true,
        }
    }),
    //creates file and links to template
    new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css"
    }),
    //clears dist for every build
    new CleanWebpackPlugin()],
    //loaders declared below here
    module: {
        rules: [
            //for loading images in dist
            {
                test: /\.html/,
                use: ["html-loader"]
            },
            //for processing css and scss files
            {
                test: /\.css|.scss$/,
                use: [
                    // MiniCssExtractPlugin.loader, can be used to create css file from css | scss file
                    'style-loader',// injects into dom
                    'css-loader',// loads css
                    'sass-loader']//converts scss to css
            },
        ]
    }
}