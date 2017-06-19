var fs = require('fs');
var queue = require('queue-async');
var childProcess = require('child_process');
var moment = require('moment');

var page = fs.readFileSync(__dirname + '/template.html', 'utf8');
var emailTemplate = fs.readFileSync(__dirname + '/email_template.html', 'utf8');

log('info', 'fetching sources')
fs.readdir(__dirname + '/sources', function(err, dirs) {
    var q = queue(10)
    dirs.forEach(function(dir) {
        var fn = require(__dirname + '/sources/' + dir)
        q.defer(fn)
    })
    q.awaitAll(function(errs, results) {
        var shows = []
        results.forEach(function(venue) {
            shows = shows.concat(venue)
        })

        log('info', 'found ' + shows.length + ' total shows')

        shows.sort(function(a, b) {
            if (a.date > b.date) return 1
            else return -1
        })

        var today = new Date()
        var year = today.getFullYear().toString()
        var month = (today.getMonth() + 1).toString()
        if (month.length === 1) month = '0' + month
        var day = today.getDate().toString()
        if (day.length === 1) day = '0' + day
        var oneWeek = moment(year + '-' + month + '-' + day).add(6, 'days').format('YYYY-MM-DD');
        var venueHash = {};
		var i = 0;
        shows.forEach(function(show) {
            if (!venueHash[show.venue]) venueHash[show.venue] = {
                venue: show.venue,
                venueURL: show.venueURL,
                tonight: [],
				one: [],
				two: [],
				three: [],
				four: [],
				five: [],
				six: [],
				seven: [],
                soon: [],
                all: []
            }
            if (show.date === year + '-' + month + '-' + day) {
                venueHash[show.venue].tonight.push(show)
                venueHash[show.venue].all.push(show)
            } else if (show.date == year + '-' + month + '-' + (today.getDate()+1)) {
				venueHash[show.venue].one.push(show)
			} else if (show.date == year + '-' + month + '-' + (today.getDate()+2)) {
				venueHash[show.venue].two.push(show)
			} else if (show.date == year + '-' + month + '-' + (today.getDate()+3)) {
				venueHash[show.venue].three.push(show)
			} else if (show.date == year + '-' + month + '-' + (today.getDate()+4)) {
				venueHash[show.venue].four.push(show)
			} else if (show.date == year + '-' + month + '-' + (today.getDate()+5)) {
				venueHash[show.venue].five.push(show)
			} else if (show.date == year + '-' + month + '-' + (today.getDate()+6)) {
				venueHash[show.venue].six.push(show)
			} else if (show.date == year + '-' + month + '-' + (today.getDate()+7)) {
				venueHash[show.venue].seven.push(show)
			}
        })
        venues = Object.keys(venueHash).map(function(key) {
            return venueHash[key]
        })

        var html = ''
        html += '<div class="navhead">TONIGHT'
        html += '<span class="date">' + moment().format('M/D') + '</span>'
        html += '</div>'
        html += '<div id="tonight">'
        venues.forEach(function(venue) {
            if (venue.tonight.length > 0) html += '<h3><a class="venue-link" target="_blank" href="' + venue.venueURL + '">' + venue.venue + '</a></h3>'
            venue.tonight.forEach(function(show, i) {
                if (i > 0) html += '<hr>'
                html += '<div class="show">'
                html += '<h4><a class="show-link" href="' + show.url + '" target="_blank">' + show.title + '</a></h4>'
                html += '<div class="info">' + show.time + '</div>'
                if (show.price) html += '<div class="info">' + show.price + '</div>'
                html += '</div>'
            })
        })
        html += '</div>'

		html += '<div class="navhead">' + moment().add(1, 'day').format('dddd');
		html += '<span class="date">' + moment().add(1, 'day').format('M/D') + '</span>';
		html += '</div>'
		html += '<div id="soon">'
		venues.forEach(function(venue) {
			if (venue.one.length > 0) html += '<h3><a class="venue-link" target="_blank" href="' + venue.venueURL + '">' + venue.venue + '</a></h3>'
			venue.one.forEach(function(show, i) {
				if (i > 0) html += '<hr>'
				html += '<div class="show">'
				html += '<h4><a class="show-link" href="' + show.url + '" target="_blank">' + show.title + '</a></h4>'
				html += '<div class="info">' + show.time + '</div>'
				if (show.price) html += '<div class="info">' + show.price + '</div>'
				html += '</div>'
			})
		})
		html += '</div>'

		html += '<div class="navhead">'+ moment().add(2, 'day').format('dddd');
		html += '<span class="date">' + moment().add(2, 'day').format('M/D') + '</span>'
		html += '</div>'
		html += '<div id="soon">'
		venues.forEach(function(venue) {
			if (venue.two.length > 0) html += '<h3><a class="venue-link" target="_blank" href="' + venue.venueURL + '">' + venue.venue + '</a></h3>'
			venue.two.forEach(function(show, i) {
				if (i > 0) html += '<hr>'
				html += '<div class="show">'
				html += '<h4><a class="show-link" href="' + show.url + '" target="_blank">' + show.title + '</a></h4>'
				html += '<div class="info">' + show.time + '</div>'
				if (show.price) html += '<div class="info">' + show.price + '</div>'
				html += '</div>'
			})
		})
		html += '</div>'

		html += '<div class="navhead">'+ moment().add(3, 'day').format('dddd');
		html += '<span class="date">' + moment().add(3, 'day').format('M/D') + '</span>'
		html += '</div>'
		html += '<div id="soon">'
		venues.forEach(function(venue) {
			if (venue.three.length > 0) html += '<h3><a class="venue-link" target="_blank" href="' + venue.venueURL + '">' + venue.venue + '</a></h3>'
			venue.three.forEach(function(show, i) {
				if (i > 0) html += '<hr>'
				html += '<div class="show">'
				html += '<h4><a class="show-link" href="' + show.url + '" target="_blank">' + show.title + '</a></h4>'
				html += '<div class="info">' + show.time + '</div>'
				if (show.price) html += '<div class="info">' + show.price + '</div>'
				html += '</div>'
			})
		})
		html += '</div>'

		html += '<div class="navhead">'+ moment().add(4, 'day').format('dddd');
		html += '<span class="date">' + moment().add(4, 'day').format('M/D') + '</span>'
		html += '</div>'
		html += '<div id="soon">'
		venues.forEach(function(venue) {
			if (venue.four.length > 0) html += '<h3><a class="venue-link" target="_blank" href="' + venue.venueURL + '">' + venue.venue + '</a></h3>'
			venue.four.forEach(function(show, i) {
				if (i > 0) html += '<hr>'
				html += '<div class="show">'
				html += '<h4><a class="show-link" href="' + show.url + '" target="_blank">' + show.title + '</a></h4>'
				html += '<div class="info">' + show.time + '</div>'
				if (show.price) html += '<div class="info">' + show.price + '</div>'
				html += '</div>'
			})
		})
		html += '</div>'

		html += '<div class="navhead">'+ moment().add(5, 'day').format('dddd');
		html += '<span class="date">' + moment().add(5, 'day').format('M/D') + '</span>'
		html += '</div>'
		html += '<div id="soon">'
		venues.forEach(function(venue) {
			if (venue.five.length > 0) html += '<h3><a class="venue-link" target="_blank" href="' + venue.venueURL + '">' + venue.venue + '</a></h3>'
			venue.five.forEach(function(show, i) {
				if (i > 0) html += '<hr>'
				html += '<div class="show">'
				html += '<h4><a class="show-link" href="' + show.url + '" target="_blank">' + show.title + '</a></h4>'
				html += '<div class="info">' + show.time + '</div>'
				if (show.price) html += '<div class="info">' + show.price + '</div>'
				html += '</div>'
			})
		})
		html += '</div>'

		html += '<div class="navhead">'+ moment().add(6, 'day').format('dddd');
		html += '<span class="date">' + moment().add(6, 'day').format('M/D') + '</span>'
		html += '</div>'
		html += '<div id="soon">'
		venues.forEach(function(venue) {
			if (venue.six.length > 0) html += '<h3><a class="venue-link" target="_blank" href="' + venue.venueURL + '">' + venue.venue + '</a></h3>'
			venue.six.forEach(function(show, i) {
				if (i > 0) html += '<hr>'
				html += '<div class="show">'
				html += '<h4><a class="show-link" href="' + show.url + '" target="_blank">' + show.title + '</a></h4>'
				html += '<div class="info">' + show.time + '</div>'
				if (show.price) html += '<div class="info">' + show.price + '</div>'
				html += '</div>'
			})
		})
		html += '</div>'

		html += '<div class="navhead">'+ moment().add(7, 'day').format('dddd');
		html += '<span class="date">' + moment().add(7, 'day').format('M/D') + '</span>'
		html += '</div>'
		html += '<div id="soon">'
		venues.forEach(function(venue) {
			if (venue.seven.length > 0) html += '<h3><a class="venue-link" target="_blank" href="' + venue.venueURL + '">' + venue.venue + '</a></h3>'
			venue.seven.forEach(function(show, i) {
				if (i > 0) html += '<hr>'
				html += '<div class="show">'
				html += '<h4><a class="show-link" href="' + show.url + '" target="_blank">' + show.title + '</a></h4>'
				html += '<div class="info">' + show.time + '</div>'
				if (show.price) html += '<div class="info">' + show.price + '</div>'
				html += '</div>'
			})
		})
		html += '</div>'

        page = page.split('{{content}}').join(html);
        fs.writeFileSync(__dirname + '/index.html', page);

        log('info', 'write mjml');
        var mjml = '';
        mjml += '<mj-column width="90%">'
		mjml += '<mj-column width="100%">'
		mjml +=  '<mj-text font-weight="bold" font-size="26" color="#01C4FF">Tonight</mj-text>';
		mjml +=  '<mj-divider border-color="#D0057A"></mj-divider></mj-column>';
        venues.forEach(function(venue) {
            if (venue.tonight.length > 0) {
                mjml += '<mj-text font-size="20px" align="left" color="#000" font-weight="700">' + venue.venue + '</mj-text>'
                mjml += '<mj-divider border-color="#01C4FF" border-width=".5px" width="88%"></mj-divider>';
            }
            venue.tonight.forEach(function(show, i) {
				var buttonText = 'Tickets'
				if(venue.venue == 'City Park Jazz'){
					buttonText = 'Info'
				}
                if (i > 0) mjml += '<mj-divider border-width=".5px" border-color="#01C4FF" width="88%" padding-bottom="3px"/>'
                mjml += '<mj-text font-size="20px" font-weight="500" padding-top="5px" padding-bottom="0px" color="#000">' + show.title + '</mj-text>'
                mjml += '<mj-text padding-bottom="0px" padding-top="0px">' + show.date.split('-')[1] + '/' + show.date.split('-')[2] + '/' + show.date.split('-')[0] + '</mj-text>'
                mjml += '<mj-text padding-top="0px">' + show.time + '</mj-text>'
				mjml += '<mj-text align="center" font-size="18" color="#D0057A" text-decoration="none" font-weight="700"><a style="text-decoration: none; color:#D0057A" href="' + show.url + '">'+buttonText+'</a></mj-text>'
            })
        })
		mjml += '<mj-column width="100%">'
		mjml +=  '<mj-text font-weight="bold" font-size="26" color="#01C4FF"  padding-top="40px">' +moment().add(1, 'day').format('dddd')+'</mj-text>';
		mjml +=  '<mj-divider border-color="#D0057A"></mj-divider></mj-column>';
		venues.forEach(function(venue) {
			if (venue.one.length > 0) {
				mjml += '<mj-text font-size="20px" align="left" color="#000" font-weight="700">' + venue.venue + '</mj-text>'
				mjml += '<mj-divider border-color="#01C4FF" border-width=".5px" width="88%"></mj-divider>';
			}
			venue.one.forEach(function(show, i) {
				var buttonText = 'Tickets'
				if(venue.venue == 'City Park Jazz'){
					buttonText = 'Info'
				}
				if (i > 0) mjml += '<mj-divider border-width=".5px" border-color="#01C4FF" width="88%" padding-bottom="3px"/>'
				mjml += '<mj-text font-size="20px" font-weight="500" padding-top="5px" padding-bottom="0px" color="#000">' + show.title + '</mj-text>'
				mjml += '<mj-text padding-bottom="0px" padding-top="0px">' + show.date.split('-')[1] + '/' + show.date.split('-')[2] + '/' + show.date.split('-')[0] + '</mj-text>'
				mjml += '<mj-text padding-top="0px">' + show.time + '</mj-text>'
				mjml += '<mj-text align="center" font-size="18" color="#D0057A" text-decoration="none" font-weight="700"><a style="text-decoration: none; color:#D0057A" href="' + show.url + '">'+buttonText+'</a></mj-text>'
			})
		})
		mjml += '<mj-column width="100%">'
		mjml +=  '<mj-text font-weight="bold" font-size="26" color="#01C4FF"  padding-top="40px">' +moment().add(2, 'day').format('dddd')+'</mj-text>';
		mjml +=  '<mj-divider border-color="#D0057A"></mj-divider></mj-column>';
		venues.forEach(function(venue) {
			if (venue.two.length > 0) {
				mjml += '<mj-text font-size="20px" align="left" color="#000" font-weight="700">' + venue.venue + '</mj-text>'
			    mjml += '<mj-divider border-color="#01C4FF" border-width=".5px" width="88%"></mj-divider>';
			}
			venue.two.forEach(function(show, i) {
				var buttonText = 'Tickets'
				if(venue.venue == 'City Park Jazz'){
					buttonText = 'Info'
				}
				if (i > 0) mjml += '<mj-divider border-width=".5px" border-color="#01C4FF" width="88%" padding-bottom="3px"/>'
				mjml += '<mj-text font-size="20px" font-weight="500" padding-top="5px" padding-bottom="0px" color="#000">' + show.title + '</mj-text>'
				mjml += '<mj-text padding-bottom="0px" padding-top="0px">' + show.date.split('-')[1] + '/' + show.date.split('-')[2] + '/' + show.date.split('-')[0] + '</mj-text>'
				mjml += '<mj-text padding-top="0px">' + show.time + '</mj-text>'
				mjml += '<mj-text align="center" font-size="18" color="#D0057A" text-decoration="none" font-weight="700"><a style="text-decoration: none; color:#D0057A" href="' + show.url + '">'+buttonText+'</a></mj-text>'
			})
		})
		mjml += '<mj-column width="100%">'
		mjml +=  '<mj-text font-weight="bold" font-size="26" color="#01C4FF"  padding-top="40px">' +moment().add(3, 'day').format('dddd')+'</mj-text>';
		mjml +=  '<mj-divider border-color="#D0057A"></mj-divider></mj-column>';
		venues.forEach(function(venue) {
			if (venue.three.length > 0) {
				mjml += '<mj-text font-size="20px" align="left" color="#000" font-weight="700">' + venue.venue + '</mj-text>'
				mjml += '<mj-divider border-color="#01C4FF" border-width=".5px" width="88%"></mj-divider>';
			}
			venue.three.forEach(function(show, i) {
				var buttonText = 'Tickets'
				if(venue.venue == 'City Park Jazz'){
					buttonText = 'Info'
				}
				if (i > 0) mjml += '<mj-divider border-width=".5px" border-color="#01C4FF" width="88%" padding-bottom="3px"/>'
				mjml += '<mj-text font-size="20px" font-weight="500" padding-top="5px" padding-bottom="0px" color="#000">' + show.title + '</mj-text>'
				mjml += '<mj-text padding-bottom="0px" padding-top="0px">' + show.date.split('-')[1] + '/' + show.date.split('-')[2] + '/' + show.date.split('-')[0] + '</mj-text>'
				mjml += '<mj-text padding-top="0px">' + show.time + '</mj-text>'
				mjml += '<mj-text align="center" font-size="18" color="#D0057A" text-decoration="none" font-weight="700"><a style="text-decoration: none; color:#D0057A" href="' + show.url + '">'+buttonText+'</a></mj-text>'
			})
		})
		mjml += '<mj-column width="100%">'
		mjml +=  '<mj-text font-weight="bold" font-size="26" color="#01C4FF"  padding-top="40px">' +moment().add(4, 'day').format('dddd')+'</mj-text>';
		mjml +=  '<mj-divider border-color="#D0057A"></mj-divider></mj-column>';
		venues.forEach(function(venue) {
			if (venue.four.length > 0) {
				mjml += '<mj-text font-size="20px" align="left" color="#000" font-weight="700">' + venue.venue + '</mj-text>'
				mjml += '<mj-divider border-color="#01C4FF" border-width=".5px" width="88%"></mj-divider>';
			}
			venue.four.forEach(function(show, i) {
				var buttonText = 'Tickets'
				if(venue.venue == 'City Park Jazz'){
					buttonText = 'Info'
				}
				if (i > 0) mjml += '<mj-divider border-width=".5px" border-color="#01C4FF" width="88%" padding-bottom="3px"/>'
				mjml += '<mj-text font-size="20px" font-weight="500" padding-top="5px" padding-bottom="0px" color="#000">' + show.title + '</mj-text>'
				mjml += '<mj-text padding-bottom="0px" padding-top="0px">' + show.date.split('-')[1] + '/' + show.date.split('-')[2] + '/' + show.date.split('-')[0] + '</mj-text>'
				mjml += '<mj-text padding-top="0px">' + show.time + '</mj-text>'
				mjml += '<mj-text align="center" font-size="18" color="#D0057A" text-decoration="none" font-weight="700"><a style="text-decoration: none; color:#D0057A" href="' + show.url + '">'+buttonText+'</a></mj-text>'
			})
		})
		mjml += '<mj-column width="100%">'
		mjml +=  '<mj-text font-weight="bold" font-size="26" color="#01C4FF"  padding-top="40px">' +moment().add(5, 'day').format('dddd')+'</mj-text>';
		mjml +=  '<mj-divider border-color="#D0057A"></mj-divider></mj-column>';
		venues.forEach(function(venue) {
			if (venue.five.length > 0) {
				mjml += '<mj-text font-size="20px" align="left" color="#000" font-weight="700">' + venue.venue + '</mj-text>'
				mjml += '<mj-divider border-color="#01C4FF" border-width=".5px" width="88%"></mj-divider>';
			}
			venue.five.forEach(function(show, i) {
				var buttonText = 'Tickets'
				if(venue.venue == 'City Park Jazz'){
					buttonText = 'Info'
				}
				if (i > 0) mjml += '<mj-divider border-width=".5px" border-color="#01C4FF" width="88%" padding-bottom="3px"/>'
				mjml += '<mj-text font-size="20px" font-weight="500" padding-top="5px" padding-bottom="0px" color="#000">' + show.title + '</mj-text>'
				mjml += '<mj-text padding-bottom="0px" padding-top="0px">' + show.date.split('-')[1] + '/' + show.date.split('-')[2] + '/' + show.date.split('-')[0] + '</mj-text>'
				mjml += '<mj-text padding-top="0px">' + show.time + '</mj-text>'
				mjml += '<mj-text align="center" font-size="18" color="#D0057A" text-decoration="none" font-weight="700"><a style="text-decoration: none; color:#D0057A" href="' + show.url + '">'+buttonText+'</a></mj-text>'
			})
		})
		mjml += '<mj-column width="100%">'
		mjml +=  '<mj-text font-weight="bold" font-size="26" color="#01C4FF" padding-top="40px"> ' +moment().add(6, 'day').format('dddd')+'</mj-text>';
		mjml +=  '<mj-divider border-color="#D0057A"></mj-divider></mj-column>';
		venues.forEach(function(venue) {
			if (venue.six.length > 0) {
				mjml += '<mj-text font-size="20px" align="left" color="#000" font-weight="700">' + venue.venue + '</mj-text>'
				mjml += '<mj-divider border-color="#01C4FF" border-width=".5px" width="88%"></mj-divider>';
			}
			venue.six.forEach(function(show, i) {
				var buttonText = 'Tickets'
				if(venue.venue == 'City Park Jazz'){
					buttonText = 'Info'
				}
				if (i > 0) mjml += '<mj-divider border-width=".5px" border-color="#01C4FF" width="88%" padding-bottom="3px"/>'
				mjml += '<mj-text font-size="20px" font-weight="500" padding-top="5px" padding-bottom="0px" color="#000">' + show.title + '</mj-text>'
				mjml += '<mj-text padding-bottom="0px" padding-top="0px">' + show.date.split('-')[1] + '/' + show.date.split('-')[2] + '/' + show.date.split('-')[0] + '</mj-text>'
				mjml += '<mj-text padding-top="0px">' + show.time + '</mj-text>'
				mjml += '<mj-text align="center" font-size="18" color="#D0057A" text-decoration="none" font-weight="700"><a style="text-decoration: none; color:#D0057A" href="' + show.url + '">'+buttonText+'</a></mj-text>'
			})
		})
		mjml += '<mj-column width="100%" >'
		mjml +=  '<mj-text font-weight="bold" font-size="26" color="#01C4FF" padding-top="40px">' +moment().add(7, 'day').format('dddd')+'</mj-text>';
		mjml +=  '<mj-divider border-color="#D0057A"></mj-divider></mj-column>';
		venues.forEach(function(venue) {
			if (venue.seven.length > 0) {
				mjml += '<mj-text font-size="20px" align="left" color="#000" font-weight="700">' + venue.venue + '</mj-text>'
				mjml += '<mj-divider border-color="#01C4FF" border-width=".5px" width="88%"></mj-divider>';
			}
			venue.seven.forEach(function(show, i) {
				var buttonText = 'Tickets'
				if(venue.venue == 'City Park Jazz'){
					buttonText = 'Info'
				}
				if (i > 0) mjml += '<mj-divider border-width=".5px" border-color="#01C4FF" width="88%" padding-bottom="3px"/>'
				mjml += '<mj-text font-size="20px" font-weight="500" padding-top="5px" padding-bottom="0px" color="#000">' + show.title + '</mj-text>'
				mjml += '<mj-text padding-bottom="0px" padding-top="0px">' + show.date.split('-')[1] + '/' + show.date.split('-')[2] + '/' + show.date.split('-')[0] + '</mj-text>'
				mjml += '<mj-text padding-top="0px">' + show.time + '</mj-text>'
				mjml += '<mj-text align="center" font-size="18" color="#D0057A" text-decoration="none" font-weight="700"><a style="text-decoration: none; color:#D0057A" href="' + show.url + '">'+buttonText+'</a></mj-text>'
			})
		})
		mjml += '</mj-column>'
        emailTemplate = emailTemplate.split('{{content}}').join(mjml);
        var mjml = require('mjml').mjml2html;
        email = mjml(emailTemplate);

        fs.writeFileSync(__dirname + '/email.html', email.html);

        log('info', 'wrote page')

        childProcess.exec('cd ' + __dirname + ';git add .; git commit -m "refresh"; git push origin gh-pages;', function() {
            log('info', 'pushed to github')
        })
    })
})

function log(level, msg) {
    process.stderr.write('[' + new Date() + '] ' + '[' + level + '] ' + msg + '\n')
    fs.appendFileSync(__dirname + '/log.txt', '[' + new Date() + '] ' + '[' + level + '] ' + msg + '\n')
}
