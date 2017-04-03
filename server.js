var express = require('express');
var app = express();

var scrapper = require('./web-scrapper.js');

app.get('/', function(req, res){
    var events = scrapper.Scrape();

    var testString = "<html><body>";

    events.forEach(function(element) {
        testString += "<p>Titre:" + element.titre + "<br>Lieu:" + element.lieu + "<br>Date:" + element.date + "<br><img height='200' src='" + element.image + "'><br>**************</p>";
    });

});

app.listen(8080, () => console.log("server running on 8080"));