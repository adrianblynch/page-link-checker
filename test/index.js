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
			"<a href='https://githubzzzzz.com/adrianblynch'>No Such Site</a>",
			"<a href='adrianblynch'>Relative URL</a>"
		]
		var baseUrl = "https://github.com/"

		plc.check(links.join(""), baseUrl, function (err, responses) {

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

			// Relative
			expect(responses[3]).to.have.keys(keys)
			expect(responses[3].link).to.have.keys(linkKeys)
			expect(responses[3].request).to.have.keys(requestKeys)
			expect(responses[3].request.failed).to.be.false
			expect(responses[3].request.statusCode).to.equal(200)

			done()

		})

	})

	it("should check all links in a page", function (done) {

		this.timeout(10000)

		var url = "https://raw.githubusercontent.com/adrianblynch/page-link-checker/master/test/page.html"

		plc.check(url, function (err, responses) {

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

			// Relative
			expect(responses[3]).to.have.keys(keys)
			expect(responses[3].link).to.have.keys(linkKeys)
			expect(responses[3].request).to.have.keys(requestKeys)
			expect(responses[3].request.failed).to.be.false
			expect(responses[3].request.statusCode).to.equal(200)

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
