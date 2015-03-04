var express = require('express');
var router = express.Router();
var keys = {
    most_popular: 'be6f432469b11c8a9b5d0533df0f0e52:11:71498139'
};
var nyt = require('newyorktimes')(keys);
//var result = nyt.query('http://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/1.json?api-key=be6f432469b11c8a9b5d0533df0f0e52:11:71498139', function (err, json) {
//    //console.log(json);
//});

/* Title */
router.get('/', function(req, res, next) {

    //var result = nyt.query('http://api.nytimes.com/svc/mostpopular/v2/mostviewed/all-sections/1.json?api-key=be6f432469b11c8a9b5d0533df0f0e52:11:71498139', function (err, json) {
    //    return json;
    //});

    //res.render('nytimes', {
    //    title: 'Index',
    //    result: result
    //});
    //res.send(result);
    //console.log(result);
});

module.exports = router;

