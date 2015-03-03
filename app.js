var express = require('express');
var logger = require('morgan');
var nyt = require('newyorktimes')(keys);
var keys = {
	most_popular: 'be6f432469b11c8a9b5d0533df0f0e52:11:71498139'
}
var	app = express();

//middleware
app.use(logger('dev'));
app.set('views', './views');
app.set('view engine', 'jade');
app.get('/', function(req, res) {
	res.render('index', { title: 'Title', message: 'Hi there!'});
})

nyt.query('http://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/1.json?api-key=be6f432469b11c8a9b5d0533df0f0e52:11:71498139', function (err, json) {
	if(err) {
		console.log(json);
	}
	console.log(json);
});


var server = app.listen(3000, function () {

	var host = server.address().address
	var port = server.address().port

	console.log('server starting at http://%s:%s', host, port)
})
