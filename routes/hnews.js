var express = require('express');
var router = express.Router();
var hnservice = require('../services/hnservice');

    /* GET home page. */
router.get('/', function(req, res, next) {
    hnservice.once('updated', function(){
        res.send(hnservice.topStories);
    });
    hnservice.fetchLatestTopStories();
});


module.exports = router;