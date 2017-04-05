var jsdom = require("jsdom");

jsdom.defaultDocumentFeatures.FetchExternalResources = ["scripts"];
jsdom.defaultDocumentFeatures.ProcessExternalResources = ["scripts"]; 

exports.Scrape = function() {

    var events = [];

    config.forEach(function (element) {
        console.log("config.forEach : " + element.url + " /// " + element.selector);

        jsdom.env({
            url:element.url,
            //scripts:["http://code.jquery.com/jquery.js"],
            done:function(err, window) {
                window.$(element.selector).each(function(index, foundNode) {
                    events.push(element.readfunction(foundNode.innerHtml));
                });
            }
        });
    });
    return events;
}



var config = [
    {
      url:"http://www.songkick.com/metro_areas/27381-canada-ottawa",
      selector: null,
      addFunction: function(err, window, events) {
          window.$("li.with-date").each(function (index, element) {
                var eventInfo = {};
                
                eventInfo.date = element.children("strong").children("time").text();

                var info = element.next();
                eventInfo.titre = info.children("p .artists .summary").children("a").children("span").children("strong").text() + info.children("p").children("a").children("span").text();
                eventInfo.lieu = info.children("p .location");

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