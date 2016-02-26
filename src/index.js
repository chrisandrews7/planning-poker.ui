var config = require('config');
require('babel-core/register');
require('./server').listen(config.get('port'), function(err) {
	console.log('Server is running');
});
