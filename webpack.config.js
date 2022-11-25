import path from "path";
import { URL } from 'url';

const __dirname = new URL('.', import.meta.url).pathname;
export default {
    context: __dirname,
    entry: './public/trackingScript.js',
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            }
        ]
    }
};