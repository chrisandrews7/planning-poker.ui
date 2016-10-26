require('babel-core/register');
require('babel-polyfill');
require('./server').listen(require('config').get('port'));
