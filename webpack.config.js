const path = require("path")

module.exports = {
    entry: {
        main: './src/main.ts',
    },
    mode: "development",
    devtool: false,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                }
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname,'./dist/')
    }
};
