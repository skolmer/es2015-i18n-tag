import { join } from 'path'

const include = join(__dirname, 'lib')

export default {
    entry: './lib/index',
    output: {
        path: join(__dirname, 'dist/lib'),
        libraryTarget: 'umd',
        library: 'es2015-i18n-tag'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/, loader: 'babel-loader', include
            }
        ]
    }
}