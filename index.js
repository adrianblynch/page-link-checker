var $ = require("cheerio")
var isHtml = require("is-html")
var request = require("request")
// var Promise = require('es6-promise').Promise // TODO: Give users promises as well as callbacks

var responses = []

function generateResponses(page, callback) {

	var links = $("a", page)
	var counter = links.length

	links.map(function (i, link) {

		var $link = $(link)

		var url = $link.attr("href")
		var response = {
			link: {
				href: url,
				text: $link.text()
			},
			request: {
				failed: false
			}
		}

		request({
			method: "HEAD",
			url: url
		}, function (err, res, body) {

			counter--

			if (err) {
				response.request = {failed: true} // TODO: Pass back more info?
			} else {
				response.request.statusCode = res.statusCode
			}

			responses.push(response)

			if (counter === 0) {
				return callback(null, responses)
			}

		})

	})

}

exports.check = function (page, callback) {

	if (isHtml(page)) {
		generateResponses(page, callback)
	} else {
		request.get(page, function (err, response, body) {
			if (err) {
				return callback(err)
			}
			generateResponses(body, callback)
		})
	}

}
