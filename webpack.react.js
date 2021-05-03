const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: "./src/renderer.tsx",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    target: "web",
    // target: 'electron-renderer',
    devtool: "source-map",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                use: ["ts-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "renderer.js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
};
