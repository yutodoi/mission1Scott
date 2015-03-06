var express = require('express');
var router = express.Router();
var nytservice = require('../services/nytservice');

/* Title */
router.get('/', function(req, res, next) {
    nytservice.once('updated', function() {
        res.send(nytservice.topStories);
        //res.render('nytimes',
        //    {
        //        title: 'NYTimes Top10',
        //        results: nytservice.topStories
        //    },
        //    function(err, html) {
        //        if(err) throw err;
        //});
    });
    nytservice.fetchLatestPopularArticle();
});

module.exports = router;
