var jsdom = require("jsdom");
var async = require("async");

jsdom.defaultDocumentFeatures.FetchExternalResources = ["scripts"];
jsdom.defaultDocumentFeatures.ProcessExternalResources = ["scripts"]; 

exports.Scrape = function(callback) {

    var calls = [];

    var events = [];

    config.forEach(function (element) {
        console.log("config.forEach : " + element.url + " /// " + element.selector);

        calls.push( function(callback) {
            jsdom.env({
            url:element.url,
            scripts:["http://code.jquery.com/jquery.js"],
            done:function(err, window) {
                element.addFunction(err, window, events);
                callback();
            }
        });
        });
    });

    async.parallel(calls, function() {
        console.log(events.length);
        callback(events);
    });
}



var config = [
    {
      url:"http://www.songkick.com/metro_areas/27381-canada-ottawa",
      selector: null,
      addFunction: function(err, window, events) {
          var $ = window.$;

          $("li.with-date").each(function () {
                var eventInfo = {};
                
                //console.log($(this).text());

                //eventInfo.date= window.$("time", window.$("strong", this)).text();

                eventInfo.date = $(this).children("strong").children("time").text();

                var info = $(this).next();
                eventInfo.titre = info.find("p .artists .summary").find("a").find("span").find("strong").text() + info.find("p").find("a").find("span").text();
                eventInfo.lieu = info.find("p .location").text();
                
                //console.log(events.length);
                
                events.push(eventInfo);
          });
      }

    },
    
//    {
//        url:"http://ottawa.eventful.com/events/categories/music",
//        selector:'#events-list > li',
//        readfunction : function(innerHtml) {
//           console.log("config : " + innerHtml);
//           
//           var eventInfo= {};

//           jsdom.env({
//               html:innerHtml,
//               scripts: ["http://code.jquery.com/jquery.js"], 
//               done: function(err, window) {
//                eventInfo.titre = window.$("h4").children("a").children("span").text();
//                eventInfo.lieu = window.$("div .event-meta").children("span").text();
//                eventInfo.date = window.$("div .event-meta").text();
//                eventInfo.image = window.$("a .tn-frame").children("img").attr("src");    
//            }});
//            return eventInfo;
//        }
//    }
];

/* **************************** */
/* Event infos :                */
/* .date
/* .lieu                        */
/* .titre                       */
/* .image                             */
/*                              */
/*                              */