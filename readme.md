# Page Link Checker

Check links on a page are correct.

## Install

npm install page-link-checker

## Usage

```javascript

var plc = require("page-link-checker")

// Check links on a page

var pageUrl = "https://github.com/adrianblynch?tab=repositories"

plc.check(pageUrl, function (err, responses) {

	console.log("Page URL:", responses)

})

// Check links in HTML

var html = "<a href='https://github.com/adrianblynch'>My Github</a><a href='https://github.com/adrianblynch?tab=repositories'>My Github Repos</a>"

plc.check(html, function (err, responses) {

	console.log("HTML:", responses)

})

// Get broken links

var html = [
	"<a href='https://github.com/adrianblynch'>My Github</a>",
	"<a href='https://github.com/adrianblynch?tab=repositories'>My Github Repos</a>",
	"<a href='https://github.com/adrianblynch/dude-wheres-my-buses'>A 404 link</a>"
].join("")

plc.check(html, function (err, responses) {

	responses = responses.filter(function (response) {
		return response.request.statusCode !== 200
	})

	console.log("Broken links:", responses);

})

```
