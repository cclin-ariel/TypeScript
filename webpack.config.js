/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

//JS->HTML import plugin
const HTMLWebpackPlugin = require('html-webpack-plugin')

//讓dist內檔案清空，以利及時更新
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//webpack中所有資訊都應該寫在module.exports
module.exports = {
    mode: 'none',

    //TS->JS 
    //入口文件 主要文件
    entry: "./src/index.ts",
    //打包後文件輸出位置
    output: {
        //打包後文件名
        filename: 'bundle.js',
        //打包後文件目錄
        path: path.resolve(__dirname, 'dist'),

        //告訴webpack編譯後文件不使用箭頭  
        environment: {
            arrowFunction: false
        }
    },
    //TS->JS 指定webpack打包時要用的module
    module: {
        //指定要加載的規則
        rules: [

            {
                // test指定的是規則生效的文件
                test: /\.ts$/,
                //要排除轉換編譯成JS的文件
                exclude: /node_modules/,
                //要使用的loader
                use: [
                    //寫在後面的先執行: ts-loader -> babel

                    //配置babel
                    {
                        //指定加載器
                        loader: "babel-loader",
                        // babel setting option
                        options: {
                            //設置預定義環境
                            "presets": ["@babel/preset-env"],
                            //要兼容的目標瀏覽器版本
                            "targets": ">1%, not ie 11",
                            // //指定corejs的版本
                            // "corejs": "3",
                            // //使用corejs的方式“usage" 表示需加載加載
                            // "useBuiltIns": "usage"
                        }
                    },
                    'ts-loader'//TS->JS
                ],

            },
            //設置less文件處理
            {
                test: /\.less$/, // .less and .css
                use: [
                    'style-loader',
                    'css-loader',
                    //import postcss
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 2 versions'
                                        },
                                    ]
                                ]
                            }
                        }
                    },
                    'less-loader'
                ],
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },






    //配置webpack插件 即可生效
    plugins: [
        //清空dist內文件
        new CleanWebpackPlugin(),
        //JS->HTML 
        new HTMLWebpackPlugin({
            //title: "這是一個自定義的title_of_HTML"
            template: "./src/index.html"//按照我已做的模板，加入編譯後的code
        }),
    ],

}