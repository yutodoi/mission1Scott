var express = require('express');
var logger = require('morgan');
var routes = require('./routes/index');
var nytimes = require('./routes/nytimes');
var hnews = require('./routes/hnews');

var	app = express();

//view = set up jade
app.set('views', './views');
app.set('view engine', 'jade');

//app.use
app.use(logger('dev'));
app.use('/', routes);
app.use('/nytimes', nytimes);
app.use('/hnews', hnews);


var server = app.listen(3001, function () {

	var host = server.address().address;
	var port = server.address().port;

	console.log('server starting at http://%s:%s', host, port)
});
