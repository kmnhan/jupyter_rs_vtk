const path = require('path');
const version = require('./package.json').version;

// Custom webpack rules are generally the same for all webpack bundles, hence
// stored in a separate local variable.
const rules = [
    { test: /\.css$/, use: ['style-loader', 'css-loader']}
]


module.exports = (env, argv) => {
    const devtool = argv.mode === 'development' ? 'source-map' : false;
    const baseConfig = {
        entry: ['./amd-public-path.js', './lib/index.js'],
        output: {
            filename: 'index.js',
            libraryTarget: 'amd',
            publicPath: '', // Set in amd-public-path.js
        },
        devtool,
        module: {
            rules: rules
        },
        // 'module' is the magic requirejs dependency used to set the publicPath
        externals: ['@jupyter-widgets/base', 'module']
    };
    return [
        {// Embeddable jupyter_rs_vtk bundle
        //
        // This bundle is placed in the dist/ directory for npm/CDN-based widget
        // loaders such as jsdelivr and unpkg.
            ...baseConfig,
            output: {
                ...baseConfig.output,
                path: path.resolve(__dirname, 'dist'),
            }
        },
        {// Local notebook widget bundle
        //
        // VS Code and classic notebook can load this from
        // share/jupyter/nbextensions/jupyter_rs_vtk/index.js.
            ...baseConfig,
            output: {
                ...baseConfig.output,
                path: path.resolve(__dirname, '../jupyter_rs_vtk/nbextension'),
            }
        }
    ];
}
