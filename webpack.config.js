/**
 * pack the web.
 */
module.exports = {
    entry: './assets/js/scripts.js',
    output: {
        filename: './assets/js/build/app.js'
    },
    module: {
        loaders: [{
            test: /\.es6$|\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader'
        }]
    },
    resolve: {
        extensions: ['', '.js','.es6']
    },
    query: {
        presets: ['es2015']
    }
};
