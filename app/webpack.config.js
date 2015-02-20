var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
    debug: true,
    devtool: "eval",
    entry: {
        login: "./web/app/login/login.js",
        app: "./web/app/js/app.js"
    },
    output: {
        path: __dirname + "/web/dist/",
        publicPath: "/dist/",
        filename: "[name].entry.chunk.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: "jsx-loader?harmony" },
            { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.(png|jpg)$/, loader: "url-loader?limit=8192"},
            { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff2" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
    resolve: {
        extensions: ["", ".js"]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new CommonsChunkPlugin("commons.chunk.js")
    ]
};