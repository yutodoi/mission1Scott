var EventEmitter = require('events').EventEmitter;
var request = require('request');

var nytservice = function() {
    this.topStories = [];
};

nytservice.prototype = Object.create(EventEmitter.prototype);
nytservice.prototype.constructor = nytservice();
nytservice.prototype.fetchLatestPopularArticle = function() {
    request("http://api.nytimes.com/svc/topstories/v1/home.json?api-key=be6f432469b11c8a9b5d0533df0f0e52:11:71498139", function(error, response, body) {
        if(error) throw error;
        this.topStories = JSON.parse(body).results;
        this.emit('updated');
    }.bind(this));
};


module.exports = new nytservice();
