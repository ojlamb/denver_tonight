var request = require('request')
var moment = require('moment')
var cheerio = require('cheerio')

var url = 'http://redrocksonline.com/concerts-events/listing'
var shows = []

module.exports = function(done) {
	request({
      url: url,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:41.0) Gecko/20100101 Firefox/41.0'
      }
    }, function(err, response, body) {
      var $ = cheerio.load(body)
      $('.redrocks').each(function(){
		  console.log($(this).find('.post_image a').attr('href'));
		// var day = date[2];
		// var month = date[1];
		// var monthNum = { 'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06','Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12' }
		// var year = (new Date()).getFullYear()
		// var time = $(this).find('.time').text();
		// if(day.length === 1) day = '0'+day;
        // var show = {
        //   venue: 'The Bluebird Theater',
        //   venueURL: 'http://redrocksonline.com',
        //   date: year + "-" + monthNum[month] + "-" + day,
        //   time: time,
        //   url: $(this).find('.post_image a').attr('href');
        // }
        // show.title = $(this).find('.post_content_wrapper .post_title').text();
        // shows.push(show)
      })

      done(null, shows)
    })
}
