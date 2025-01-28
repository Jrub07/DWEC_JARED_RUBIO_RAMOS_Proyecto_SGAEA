const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "production",
    entry: './main.js', // Ajusta la entrada al archivo principal
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.(js|jsx)$/,
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./index.html",
        })
    ]
};