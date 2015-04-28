var expect = require("chai").expect
var plc = require("../")
var request = require("request")

describe("check()", function () {

	var keys = ["link", "request"]
	var linkKeys = ["href", "text"]
	var requestKeys = ["failed", "statusCode"]

	it("should check all links in HTML", function (done) {

		var links = [
			"<a href='https://github.com/adrianblynch'>My Github</a>",
			"<a href='https://github.com/noonehereexceptforus'>Noone's Github</a>",
			"<a href='https://githubzzzzz.com/adrianblynch'>No Such Site</a>"
		]

		plc.check(links.join(""), function (err, responses) {

			expect(responses).to.be.an("array").and.have.length(links.length)

			// Good
			expect(responses[0]).to.have.keys(keys)
			expect(responses[0].link).to.have.keys(linkKeys)
			expect(responses[0].request).to.have.keys(requestKeys)
			expect(responses[0].request.failed).to.be.false
			expect(responses[0].request.statusCode).to.equal(200)

			// Bad
			expect(responses[1]).to.have.keys(keys)
			expect(responses[1].link).to.have.keys(linkKeys)
			expect(responses[1].request).to.have.keys(requestKeys)
			expect(responses[1].request.failed).to.be.false
			expect(responses[1].request.statusCode).to.equal(404)

			// Broken
			expect(responses[2]).to.have.keys(keys)
			expect(responses[2].link).to.have.keys(linkKeys)
			expect(responses[2].request).to.have.keys(requestKeys)
			expect(responses[2].request.failed).to.be.true
			expect(responses[2].request.statusCode).to.be.null

			done()

		})

	})

	it("should check all links in a page", function (done) {

		this.timeout(5000)

		var url = "https://www.google.co.uk/"

		plc.check(url, function (err, responses) {

			expect(responses).to.be.an("array")
			expect(responses[0]).to.have.keys(["link", "request"])
			expect(responses[0].link).to.have.keys(["href", "text"])
			expect(responses[0].request).to.have.keys(["failed", "statusCode"])

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
