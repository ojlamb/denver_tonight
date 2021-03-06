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
		var day = $(this).find('.eventInfo .eventDay').text();
		if(day.length === 1) day = '0'+day;
		var month = $(this).find('.eventInfo .eventMonth').text();
		var monthNum = { 'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06','Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12' }
		var year = (new Date()).getFullYear()
        var show = {
          venue: 'The Fillmore Auditorium',
          venueURL: 'http://www.fillmoreauditorium.org/',
          date: year + "-" + monthNum[month] + "-" + day,
          time: '8:00 pm',
          url: $(this).find('h3 a').attr('href')
        }
        show.title = $(this).find('h3 a').text();
        shows.push(show)
      })

      done(null, shows)
    })
}
