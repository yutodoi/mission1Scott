var express = require('express');
var router = express.Router();
var nytservice = require('../services/nytservice');

/* Title */
router.get('/', function(req, res, next) {
    nytservice.once('updated', function () {
        res.render('nytimes',
            {
                title: 'NYTimes Top10 Stories',
                results: nytservice.topStories
            });
    });
    nytservice.fetchLatestPopularArticle();
});


module.exports = router;
