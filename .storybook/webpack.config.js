const path = require('path');


module.exports = function override(config, env) {
    config.module.rules.push({
        test: /\.jsx?$/,
        loaders: [ require.resolve('@storybook/addon-storysource/loader') ],
        enforce: 'pre',
    });

    config.module.rules.push({
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader?limit=100000'
    });

    return config
};