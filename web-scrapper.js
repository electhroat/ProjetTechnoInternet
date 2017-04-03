var Xray = require('x-ray');
var x = Xray();

exports.Scrape = function() {

    var events = [];

    config.forEach(function (element) {
        console.log("config.forEach : " + element.url + " /// " + element.selector);

        x(element.url, element.selector)(function(innerHtml){
            console.log("X-ray : " + innerHtml);

            events.push(element.readfunction(innerHtml));
        });
    });

    return events;

}

var jsdom = require("jsdom");

var config = [
    {
        url:"http://ottawa.eventful.com/events/categories/music",
        selector:'li [itemtype="http://schema.org/Event"]',
        readfunction : function(innerHtml) {
           console.log("config : " + innerHtml);
           
           var eventInfo= {};

           jsdom.env({
               html:innerHtml,
               scripts: ["http://code.jquery.com/jquery.js"], 
               done: function(err, window) {
                eventInfo.titre = window.$("h4").children("a").children("span").text();
                eventInfo.lieu = window.$("div .event-meta").children("span").text();
                eventInfo.date = window.$("div .event-meta").text();
                eventInfo.image = window.$("a .tn-frame").children("img").attr("src");    
            }});
            return eventInfo;
        }
    }
];

/* **************************** */
/* Event infos :                */
/* .date
/* .lieu                        */
/* .titre                       */
/* .image                             */
/*                              */
/*                              */