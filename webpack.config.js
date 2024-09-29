import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default {
  entry: {
    main: './src/index.js',
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: 'bundle.js',
    clean: true,
  },
  mode: process.env.NODE_ENV || 'development',
  module: {
    rules: [
      {
        test: /\.(sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      stage: 3,
                      features: {
                        'nesting-rules': true,
                      },
                      browsers: 'last 5 versions',
                    },
                  ],
                ],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
  devServer: {
    contentBase: path.join(process.cwd(), 'dist'),
    compress: true,
    host: '0.0.0.0',
    port: 8000,
    open: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    clientLogLevel: 'error',
  },
};
