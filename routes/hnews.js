var express = require('express');
var router = express.Router();

var hn =require('hacker-news-api');
var result = hn.hitsPerPage(10).story().show_hn().top(function(error, data) {
    if(error) throw error;
    return data;
});



    /* GET home page. */
router.get('/', function(req, res, next) {
    console.log(result);
    res.render('hnews', {
        title: 'Index'
    });
    res.send({json: result});
});


module.exports = router;