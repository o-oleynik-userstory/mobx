const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const paths = {
    dist: path.join(__dirname, 'www'),
    public: path.join(__dirname, 'public'),
    src: 'src',
};

/**
 * Получить конфигурацию webpack.
 * @param env Окружение.
 * @param argv Аргументы
 * @returns {*} Конфигурация webpack.
 */
function webpackConfig(env, argv) {
    const {mode} = argv;
    const isProd = 'production' === mode;
    const styleLoader = isProd ? MiniCssExtractPlugin.loader : 'style-loader';

    return {
        devServer: {
            port: 8002,
        },
        entry: 'index.jsx',
        mode,
        module: {
            rules: [
                {
                    test: /\.html$/u,
                    use: {
                        loader: 'file-loader',
                        options: {name: '[name].[ext]'},
                    },
                },
                {
                    exclude: /node_modules/u,
                    test: /\.(js|jsx)$/u,
                    use: {
                        loader: 'babel-loader',
                        options: {cacheDirectory: true},
                    },
                },
                {
                    test: /\.css$/u,
                    use: [styleLoader, 'css-loader', 'postcss-loader'],
                },
                {
                    test: /\.less$/u,
                    use: [styleLoader, 'css-loader', 'postcss-loader', 'less-loader'],
                },
                {
                    test: /\.(ttf|otf|eot|woff|woff2)(\?[a-z0-9]+)?$/u,
                    use: {
                        loader: 'file-loader',
                        options: {name: 'fonts/[name].[ext]'},
                    },
                },
                {
                    test: /.*\.(png|jpg|jpeg|gif)$/iu,
                    use: {
                        loader: 'file-loader',
                        options: {name: 'images/[name].[ext]'},
                    },
                },
                {
                    test: /\.svg$/u,
                    use: ['@svgr/webpack'],
                },
            ],
        },
        output: {
            filename: 'js/[name].[hash:5].min.js',
            jsonpFunction: 'gic',
            library: ['gic', '[name]'],
            path: paths.dist,
            publicPath: '/',
        },
        plugins: [
            ...(isProd ? [new CleanWebpackPlugin({dry: false, verbose: true})] : []),
            new webpack.DefinePlugin({'process.env': {NODE_ENV: JSON.stringify(mode)}}),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                hash: true,
                inject: true,
                production: isProd,
                template: path.join(paths.src, 'index.tpl'),
            }),
            new webpack.IgnorePlugin(/^\.\/locale$/u, /moment$/u),
            ...(isProd
                ? [
                      new MiniCssExtractPlugin({
                          filename: 'css/[name].[hash:5].min.css',
                      }),
                      new webpack.LoaderOptionsPlugin({
                          debug: false,
                          minimize: true,
                          options: {customInterpolateName: (url) => url.toLowerCase()},
                      }),
                  ]
                : [new webpack.HotModuleReplacementPlugin()]),
        ],
        resolve: {
            extensions: ['.js', '.jsx'],
            modules: ['src', 'node_modules'],
        },
    };
}

module.exports = webpackConfig;
