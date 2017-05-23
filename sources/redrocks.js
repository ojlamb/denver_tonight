var request = require('request')
var moment = require('moment')
var cheerio = require('cheerio')

var url = 'http://redrocksonline.com/concerts-events/listing'
var shows = []
var months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December']

module.exports = function(done) {
	request({
      url: url,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.10; rv:41.0) Gecko/20100101 Firefox/41.0'
      }
    }, function(err, response, body) {
      var $ = cheerio.load(body)
      $('.redrocks').each(function(){
		var date = $(this).find('.post_content_wrapper .post_dates .post_day .date_time h1 p').remove().text().split(' ');
		var date = $(this).find('.post_content_wrapper .post_dates .post_day .date_time h1').text().split(' ');
		if (date.length < 1){
			var day = date[1].replace(',','');
			var month = date[0];
			var monthNum = { 'January': '01', 'February': '02', 'March': '03', 'April': '04', 'May': '05', 'June': '06','July': '07', 'August': '08', 'September': '09', 'October': '10', 'November': '11', 'December': '12' }
			var year = date[2];
			var time = $(this).find('.post_content_wrapper .post_dates .post_time .date_time .h1').text();
			if(day.length === 1) day = '0'+day;
			var show = {
			  venue: 'Red Rocks',
			  venueURL: 'http://redrocksonline.com',
			  date: year + "-" + monthNum[month] + "-" + day,
			  time: time,
			  url: $(this).find('.post_image a').attr('href')
			}
			show.title = $(this).find('.post_content_wrapper .post_title').text();
			shows.push(show)
		}
      })

      done(null, shows)
    })
}
