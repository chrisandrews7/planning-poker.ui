require('babel-core/register');
require('./server').listen(3333, function(err) {
	console.log('Server is running');
});
