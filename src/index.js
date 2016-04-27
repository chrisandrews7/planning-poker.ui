require('babel-core/register');
require('babel-polyfill');
require('./server').listen(require('config').get('port'), () => {
	console.log('Server is running'); // eslint-disable-line
});
