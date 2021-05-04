const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./src/JS/index.js'],
    output: {
        path: path.resolve(__dirname, '../web/src/main/resources/static/JS'),
        filename: 'bundle.js'
    },
    /*plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/HTML/template.html'
        })
    ],*/
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(css|scss)$/,
                use: [{
                    loader: 'style-loader',
                },{
                    loader: 'css-loader'
                }, {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function(){
                            return [
                                require('precss'),
                                require('autoprefixer')
                              ];
                        }
                    } 
                }, {
                    loader: 'sass-loader'
                }]
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/,
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[hash].[ext]',
                    publicPath: '../web/src/main/resources/static/IMG'
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash].[ext]',
                  publicPath: '../web/src/main/resources/static/IMG'
                }
            }
        ]
    }
};