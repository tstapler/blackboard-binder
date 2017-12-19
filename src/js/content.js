import Parser from "./parser"

const parser = new Parser()

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {

		console.log("chrome.runtime.onMessage", request);
    setTimeout(function(){
      if (request.getCourseList) {
        console.log("Updating course list")
        console.log(parser.getCourseList())
      }
      else if(request.parseFiles) {
        console.log(parser.parseFiles())
      }
      // Universal ContentScript communication handler
      else if(request.contentScriptCall) {
      }
    }, 1000)
	}
);
