// ==UserScript==
//
//Displayable Name of your script 
// @name           SeattleTimes
//
// brief description
// @description    Removes paywall and ads   
//
//URI (preferably your own site, so browser can avert naming collisions
// @namespace      http://chingr.com/userscripts/seattletimes/
//
// Your name, userscript userid link (optional)   
// @author         Jeff Ching
//
// If you want to license out
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
//
//(optional) may be used by browsers to display an about link
// @homepage       http://chingr.com/userscripts/seattletimes/
//
//Version Number
// @version        1.0
//
// Urls process this user script on
// @include        http://*seattletimes.com/*
//
// Add any library dependencies here, so they are loaded before your script is loaded.
//
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
//
// @history        1.0 first version
// @history        1.0b first beta version, who knew!!
//
// ==/UserScript==


//And of course your code!!
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

addJQuery(function(){
  jQ.each([
    ".hard_paywall",
    "#topadblock",
    "#adright",
    "#adright2",
    "#nav-sec",
    "#topadblock",
    "#adbottom",
    "#admiddle",
    "#admiddle2",
    "#admiddle3",
    "#admiddle3center",
    ".neighborhood-selection-overlay",
    "#accordion"
    ], function(i, selector) {
      jQ(selector).remove();
  });

  jQ("body").removeClass("noscroll");
  //jQ("#container").css("width", "inherit");
  //jQ("#leftcolumn").css("width", "inherit");
  jQ("#content").css("background-image", "none");
});
