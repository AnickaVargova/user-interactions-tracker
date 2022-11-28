import path from "path";
import { URL } from 'url';

const __dirname = new URL('.', import.meta.url).pathname;
export default {
    context: __dirname,
    entry: './public/trackingScript.ts',
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'ts-loader'],
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
      }
};