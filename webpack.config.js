const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
    },
    devtool: 'inline-source-map',

    devServer: {
        contentBase: './dist',
        port: 8082
    },

    module: {
        rules: [
            {
                test: /\.html$/i,
                use: [
                    {
                        loader: 'file-loader'
                    }
                ]
            }
        ]
    }
}
