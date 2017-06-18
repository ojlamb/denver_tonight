var request = require('request')
var moment = require('moment')
var cheerio = require('cheerio')

var url = 'http://www.cervantesmasterpiece.com/calendar/'
var shows = []

module.exports = function(done) {
	request({
      url: url,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:41.0) Gecko/20100101 Firefox/41.0'
      }
    }, function(err, response, body) {
      var $ = cheerio.load(body)
      $('.vevent').each(function(){
		  if ($(this).find('.date .value-title').attr('title') == undefined) { return; }
		  var dateRaw = $(this).find('.date .value-title').attr('title').split('T');
		  var date = dateRaw[0].split('-')
		  var day = date[2];
		  var month = date[1];
		  var year = (new Date()).getFullYear()
		  if(day.length === 1) day = '0'+day;
		  console.log
          var show = {
	          venue: 'Cervantes',
	          venueURL: 'http://www.cervantesmasterpiece.com/',
	          date: year + "-" + month + "-" + day,
	          time: $(this).find('.start-time').first().text(),
	          url: 'http://www.cervantesmasterpiece.com' + $(this).find('div a').attr('href')
	        }
        show.title = $(this).find('div a').text();
		if(!show.title){ return; }
        shows.push(show)
      })

      done(null, shows)
    })
}
