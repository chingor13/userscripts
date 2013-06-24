var debug = $('<div id="debug-info"><dl></dl></div>'),
  list = debug.find("dl");

var typeStrings = {
  "r": "revision",
  "d": "date",
  "m": "machine",
  "p": "http_host",
  "p_id": "page id",
  "c": "channel id",
  "t": "render time"
}

$("body").contents().filter(function(){
  return this.nodeType == 8;
}).each(function(i, e){
  var values = $.trim(e.textContent).split(":");
  if(values.length >= 2) {
    var type = typeStrings[values[0]];
    if(type == undefined) {
      type = values[0];
    }
    list.append('<dt>' + type + '</dt>');
    list.append('<dd>' + values[1] + '</dd>');
  }
});
$("body").append(debug);
