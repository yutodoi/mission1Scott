var express = require('express');
var router = express.Router();
var hnservice = require('../services/hnservice');

    /* GET home page. */
router.get('/', function(req, res, next) {
    hnservice.once('updated', function(){
        //console.log(hnservice.topStories);
        res.render('hnews',
            {
                title: 'Hacker News Top10 Stories',
                results: hnservice.topStories
            });
    });
    hnservice.fetchLatestTopStories();
});


module.exports = router;