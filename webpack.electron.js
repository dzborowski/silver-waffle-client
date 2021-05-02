module.exports = {
    entry: './src/main.ts',
    target: 'electron-main',
    module: {
        rules: [{
            test: /\.ts$/,
            use: [{ loader: 'ts-loader' }]
        }]
    },
    output: {
        path: __dirname + '/dist',
        filename: 'main.js'
    }
}
