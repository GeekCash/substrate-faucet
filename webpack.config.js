// module.exports = require('./webpack/' + process.env.NODE_ENV)();

var webpack = require('webpack');
    // { merge } = require('webpack-merge'),    
    

module.exports = (env, argv) => {

    console.log("Webpack args: ", argv);

    var configs = [
        require('./webpack/server'),
        // require('./webpack/wap')        
    ];

    configs.forEach(config => {
        if (argv.mode === 'development') {
            //config = merge(config, { devtool: 'source-map' });
            config.devtool = 'source-map';
        }

        if (argv.mode === 'production') {
            config.plugins.push(new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("production") }));
                  
        }

    });

    return configs;
};