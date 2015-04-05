var jsdom = require("jsdom")
// var jquery = require("jquery") // TODO: Use this over the remote jquery source
var request = require("request")
// var Promise = require('es6-promise').Promise // TODO: Give users promises as well as callbacks

var responses = [];

exports.check = function(page, callback) {

	jsdom.env(page, ["http://code.jquery.com/jquery.js"], function(errs, window) {

		if (errs) {
			return callback(errs)
		}

		var links = window.$("a")
		var counter = links.length

		links.map(function(i, link) {

			var response = {
				link: {
					href: link.href,
					text: link.innerHTML
				},
				request: {
					failed: false
				}
			}

			request({
				method: "HEAD",
				url: link.href
			}, function(err, res, body) {

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

	})

}
