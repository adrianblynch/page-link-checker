var expect = require("chai").expect
var plc = require("../")
var request = require("request")

describe("check()", function () {

	var keys = ["link", "request"]
	var linkKeys = ["href", "text"]
	var requestKeys = ["failed", "statusCode"]

	it("should check all links in HTML", function (done) {

		var page = [
			"<a href='https://github.com/adrianblynch'>My Github</a>",
			"<a href='https://github.com/adrianblynch?tab=repositories'>My Github Repos</a>"
		].join("")

		plc.check(page, function (err, responses) {

			expect(responses).to.be.an("array").and.have.length(2)
			expect(responses[0]).to.have.keys(keys)
			expect(responses[0].link).to.have.keys(linkKeys)
			expect(responses[0].request).to.have.keys(requestKeys)
			expect(responses[0].request.failed).to.be.false

			done()

		})

	})

	it("should check all links in a page", function (done) {

		this.timeout(10000)

		var url = "http://www.adrianlynch.co.uk/"

		plc.check(url, function (err, responses) {

			expect(responses).to.be.an("array")
			expect(responses[0]).to.have.keys(["link", "request"])
			expect(responses[0].link).to.have.keys(["href", "text"])
			expect(responses[0].request).to.have.keys(["failed", "statusCode"])
			expect(responses[0].request.failed).to.be.false

			done()

		})

	})

	// This was my original reason for creating this module.
	// The first two links I clicked on in this list of languages
	// that compile to JS were broken.

	// it("should list all links in a page", function (done) {

	// 	this.timeout(90000)

	// 	var page = "https://github.com/jashkenas/coffeescript/wiki/List-of-languages-that-compile-to-JS"

	// 	plc.check(page, function (err, responses) {

	// 		expect(responses).to.be.an("array").and.have.length(2)
	// 		expect(responses[0]).to.have.keys(["link", "request"])
	// 		expect(responses[0].link).to.have.keys(["href", "text"])
	// 		expect(responses[0].request).to.have.keys(["failed", "statusCode"])
	// 		expect(responses[0].request.failed).to.be.false

	// 		console.log(JSON.stringify(responses, null, 3))

	// 		done()

	// 	})

	// })

})
