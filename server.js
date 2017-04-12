var express = require('express');
var app = express();

var scrapper = require('./web-scrapper.js');

app.get('/', function(req, res){
    scrapper.Scrape(function(events) {

        console.log(events.length);

        var testString = "<html><body>";

        console.log(events.length);

        events.forEach(function(element) {
            console.log(element);
            testString += "<p>Titre:" + element.titre + "<br>Lieu:" + element.lieu + "<br>Date:" + element.date + "<br><img height='200' src='" + element.image + "'><br>**************</p>";
        });

        testString += "</body></html>";

        res.send(testString);
    });

});

app.listen(8080, () => console.log("server running on 8080"));