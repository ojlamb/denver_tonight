var request = require('request')
var moment = require('moment')
var cheerio = require('cheerio')

var url = 'http://cityparkjazz.org/2017-calendar'
var shows = []

module.exports = function(done) {
	request({
      url: url,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:41.0) Gecko/20100101 Firefox/41.0'
      }
    }, function(err, response, body) {
      var $ = cheerio.load(body)
      $('.eventlist-event').each(function(){
		var date = $(this).find('.event-date').attr('datetime').split('-')
		var day = date[2];
		var month = date[1];
		var year = (new Date()).getFullYear()
		var time = $(this).find('.eventlist-meta-time .event-time-12hr-start').text();
		if(day.length === 1) day = '0'+day;
        var show = {
          venue: 'City Park Jazz',
          venueURL: 'http://cityparkjazz.org',
          date: year + "-" + month + "-" + day,
          time: time,
          url: $(this).find('.eventlist-title-link').attr('href')
        }
        show.title = $(this).find('h1 .eventlist-title').text();
        shows.push(show)
		console.log(show);
      })

      done(null, shows)
    })
}
