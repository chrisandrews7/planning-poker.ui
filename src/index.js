require('babel-core/register');
var config = require('config');
require('./server').listen(config.get('port'), function(err) {
	console.log('Server is running');
});
