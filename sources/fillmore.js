var request = require('request')
var moment = require('moment')
var cheerio = require('cheerio')

var url = 'http://www.fillmoreauditorium.org/events'
var shows = []

module.exports = function(done) {
	request({
      url: url,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:41.0) Gecko/20100101 Firefox/41.0'
      }
    }, function(err, response, body) {
      var $ = cheerio.load(body)
      $('.eventBox').each(function(){
        var show = {
          venue: 'The Fillmore Auditorium',
          venueURL: 'http://www.fillmoreauditorium.org/',
          date: $(this).find('.eventDay').attr('.eventDay')+$(this).find('.eventDay').attr('.eventMonth'),
          time: '8:00',
          url: $(this).find('h3').attr('href')
        }
        show.title = $(this).find('h3 a').text();
        shows.push(show)
		console.log(show)
      })

      done(null, shows)
    })
}
