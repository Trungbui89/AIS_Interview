const path = require('path');
module.exports = {
    resolve: {
        alias: {
            '@components': path.resolve(__dirname, './src/components'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@constants': path.resolve(__dirname, './src/constants'),
            '@controller': path.resolve(__dirname, '/src/controller/'),
            '@helper': path.resolve(__dirname, './src/helper'),
        },
    },
};
