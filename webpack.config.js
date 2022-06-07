// const webpack = require('webpack');
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: "all"
        }
    }

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin()
        ]
    }

    return config;
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;
const cssLoaders = loader => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true,
                import: true,
                sourceMap: isDev,
            }
        },
        {
            loader:'css-loader',
            options: {
                sourceMap: isDev,
            },
        }
    ];

    if (loader) {
        loaders.push(loader);
    }

    return loaders;
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './app.js'],
    },
    output: {
        filename: `${filename('js')}`,
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx', '.png', '.jpg', '.jpeg', '.svg', '.fbx'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@scss': path.resolve(__dirname, 'src/scss'),
            '@img': path.resolve(__dirname, 'src/img'),
            '@js': path.resolve(__dirname, 'src/js'),
        }
    },
    optimization: optimization(),
    devServer: {
        port: 3100,
        hot: isDev,
        open: true,
        useLocalIp: true,
        disableHostCheck: true,
    },
    devtool: isDev ? 'source-map' : '',
    plugins: [
        new HTMLWebpackPlugin({
            // title: "ThreeJS scene",
            template: './index.html',
            minify: {
                collapseWhitespace: isProd,
            },
        }),
        // new webpack.ProvidePlugin({
        //     '$': "jquery",
        //     'jQuery': "jquery",
        // }),

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets'),
                    to: path.resolve(__dirname, 'dist/assets')
                }
            ]
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/' + filename('css'),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders(),
            },
            {
                test: /\.s[ac]ss$/i,
                use: cssLoaders('sass-loader'),
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            context: path.resolve(__dirname, "src/"),
                            outputPath: 'img/',
                            publicPath: '../img/',
                            useRelativePaths: true
                        }
                    }
                ]
            },
            {
                test: /\.(eot|woff|woff2|ttf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            context: path.resolve(__dirname, "src/fonts"),
                            outputPath: 'fonts/',
                            publicPath: '../fonts/',
                            useRelativePaths: true
                        }
                    }
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread']
                    }
                }
            },
            {
                test: /\.json5$/i,
                loader: 'json5-loader',
                type: 'javascript/auto',
            }
        ],
    }
}