const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = merge(common, {
    mode: "development",//doesnt require extra things as we are using dev server
    plugins: [new HtmlWebpackPlugin({
        template: "./src/template.html",
    })],
    module: {
        rules: [
            {
                test: /\.css|.scss$/,
                use: ['style-loader',// injects into dom
                    'css-loader',// loads css
                    'sass-loader']//converts scss to css
            },
        ]
    }
});
//webpack-dev-server doesnt create dist folder, creates it in memory and watches and reloads in server