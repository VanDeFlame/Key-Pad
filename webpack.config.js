const path                    = require('path');
const HtmlWebPackPlugin       = require('html-webpack-plugin'); 
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]',
	},
	mode: 'development',
    devtool: 'source-map',
	resolve: {
		extensions: ['.js', '.jsx'],
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
            '@containers': path.resolve(__dirname, 'src/containers'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@styles': path.resolve(__dirname, 'src/styles'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@scripts': path.resolve(__dirname, 'src/scripts'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@context': path.resolve(__dirname, 'src/context'),
        }
	},
    module: {
        rules: [
            {
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.(css|scss)$/,
                exclude: /styles\.css$/,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader",
				],
			},
            {
                test: /styles\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: false }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                type: "asset/resource",
            }
        ]
    },
	plugins: [
		new HtmlWebPackPlugin({
			template: './public/index.html',
			filename: './index.html'
		}),
		new MiniCssExtractPlugin({
			filename: 'assets/[name].[contenthash].css',
		}),
	],
    watchOptions: {
        aggregateTimeout: 500,
        poll: 1000
    },
	devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        hot: false,
        watchFiles: {
            paths: [
                'src/**/*.jsx',
                'src/hooks/*.js',
                'src/styles/*.scss'
            ],
        },
        port: 8080,
        open: true,
        compress: true,
		historyApiFallback: true,
	}
}