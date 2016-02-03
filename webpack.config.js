'use strict';

module.exports = {
    context: __dirname + '/app',
    entry: "./main",
    output: {
        path: __dirname + "/build",
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                //tell webpack to use jsx-loader for all *.jsx files
                test: /\.jsx$/,
                loader: 'babel?presets[]=react,presets[]=es2015'
            },
            {
                test: /\.styl$/,
                loader: 'style-loader!css-loader!stylus-loader'
            }
        ]
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx']
    },
    watch: true,
    watchOptions: {
        aggregateTimeout: 100
    },
    devtool: 'source-map'
}

