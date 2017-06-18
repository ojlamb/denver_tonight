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
		  console.log($(this).find('.date').attr('title'));
		// var date = $(this).find('.date').text().split(',')[1].split(' ');
		// var day = date[2];
		// var month = date[1];
		// var monthNum = { 'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06','Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12' }
		// var year = (new Date()).getFullYear()
		// var time = $(this).find('.time').text();
		// if(day.length === 1) day = '0'+day;
        // var show = {
        //   venue: 'Cervantes',
        //   venueURL: 'http://www.cervantesmasterpiece.com//',
        //   date: year + "-" + monthNum[month] + "-" + day,
        //   time: time,
        //   url: $(this).find('.title h3 a').attr('href')
        // }
        // show.title = $(this).find('.title h3').text();
        // shows.push(show)
      })

      done(null, shows)
    })
}
