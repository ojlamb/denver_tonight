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
		  console.log(date)
		  var day = date[2];
		  var month = date[1];
		  //var monthNum = { 'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06','Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12' }
		  var year = (new Date()).getFullYear()
		  if(day.length === 1) day = '0'+day;
          var show = {
	          venue: 'Cervantes',
	          venueURL: 'http://www.cervantesmasterpiece.com/',
	          date: year + "-" + month + "-" + day,
	          time: $(this).find('div h1 h3').text(),
	          url: 'http://www.cervantesmasterpiece.com' + $(this).find('div a').attr('href')
	        }
        show.title = $(this).find('div a').text();
		if(!show.title){ return; }
        shows.push(show)
		console.log(show);
      })

      done(null, shows)
    })
}
