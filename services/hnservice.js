var EventEmitter = require('events').EventEmitter;
var hn = require('hacker-news-api');

var hnservice = function() {
    this.topStories = [];
}

hnservice.prototype = Object.create(EventEmitter.prototype);
hnservice.prototype.constructor = hnservice();
hnservice.prototype.fetchLatestTopStories = function() {
    hn.hitsPerPage(10).story().show_hn().top(function(error, data) {
        if(error) throw error;
        this.topStories = data["hits"];
        this.emit('updated');
    }.bind(this))
}

module.exports = new hnservice();