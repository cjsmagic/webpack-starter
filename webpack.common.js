const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: "./src/index.js",
        vendor: './src/vendor.js'
    },
    // plugins: [new HtmlWebpackPlugin({
    //     template: "./src/template.html",
    // })]
    //create index.html in dist and adds hashed bundle scripts to it dynamically
    //loaders declared below here
    module: {
        rules: [
            // {
            //     test: /\.css|.scss$/,
            //     use: ['style-loader',// injects into dom
            //         'css-loader',// loads css
            //         'sass-loader']//converts scss to css
            // },
            {
                test: /\.html/,
                use: ["html-loader"]//loading images in dist
            },
            //need to investigate on fileloader, doesnt work
            // {
            //     test: /\.(svg|png|jpg|gif)$/,
            //     use: {
            //         loader: "file-loader",
            //         options: {
            //             name: "[name].[hash].[ext]",
            //             outputPath: "imgs"
            //         }
            //     }
            // }
        ]
    }
}