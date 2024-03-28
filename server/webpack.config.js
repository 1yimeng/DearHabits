const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, "..", "DearHabits", "src", "main.jsx"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'dear_habits.bundle.js',
        clean: true,
        publicPath: '/',
    },
    devServer: {
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                use: ['file-loader'],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.?(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env', ["@babel/preset-react", {"runtime": "automatic"}]],
                    plugins: [
                        "@babel/plugin-transform-class-properties"
                    ]
                  }
                }                
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: path.join(__dirname, "..", "DearHabits", "src", "index.html"),
        }),
      ],
}