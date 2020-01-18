const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = env => {
    const mode = env && env.NODE_ENV || 'development';
    const prod = mode === 'production';

    return {
        entry: {
            bundle: ['./src/main.js']
        },
        resolve: {
            alias: {
                svelte: path.resolve('node_modules', 'svelte')
            },
            extensions: ['.mjs', '.js', '.svelte'],
            mainFields: ['svelte', 'browser', 'module', 'main']
        },
        output: {
            path: __dirname + '/public/build',
            filename: '[name].js',
            chunkFilename: '[name].[id].js'
        },
        module: {
            rules: [
                {
                    test: /\.svelte$/,
                    use: {
                        loader: 'svelte-loader',
                        options: {
                            emitCss: true,
                            hotReload: true
                        }
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        /**
                         * MiniCssExtractPlugin doesn't support HMR.
                         * For developing, use 'style-loader' instead.
                         * */
                        prod ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader'
                    ]
                }
            ]
        },
        mode,
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css'
            })
        ],
        devtool: prod ? false : 'source-map',
        devServer: {
            contentBase: path.join(__dirname, "public/"),
            port: 8000,
            publicPath: "/build",
            hot: false
        },
    }
};
