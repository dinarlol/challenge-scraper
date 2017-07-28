var request = require('request')
var cheerio = require('cheerio')

var domain = 'https://losangeles.craigslist.org'
var baseUrl = domain + '/search/apa'

let popertiesreq = ["span.result-price", "a.result-title.hdrlnk", "span.housing", "span.result-hood", "time.result-date"]
let json = { "date": "", "title": "", "url": "", "price": "", "bedroom": "", "size": "", "neighborhood": "" }


request({
    method: 'GET',
    url: baseUrl
}, function (err, response, body) {
    if (err) return console.error(err);

    // Pass page body to Cherrio to initalize in $
    $ = cheerio.load(body);
    popertiesreq.forEach(function (txt) {
        var val = $('#sortable-results li ' + txt).first()
        if ($(val).hasClass("result-date")) {
            json.date = $(val).attr("datetime")
        } else if ($(val).hasClass("result-price")) {
            json.price = $(val).text()
        } else if ($(val).hasClass("result-title")) {
            json.url = domain + $(val).attr('href')
            json.title = $(val).text()
        } else if ($(val).hasClass("result-hood")) {
            json.neighborhood = $(val).text().replace(/[^a-zA-Z 0-9]+/g, '').trim()
        } else if ($(val).hasClass("housing")) {
            json.bedroom = $(val).text().split('-')[0].replace(/[^a-zA-Z 0-9]+/g, '').trim()
            json.size = $(val).text().split('-')[1].replace(/[^a-zA-Z 0-9]+/g, '').trim()

        } else { console.log($(val).text()); }

    }, this);
    // print the populated json to show results
    console.log(json)
})



module.exports = function (nDesired, cb) {

}
