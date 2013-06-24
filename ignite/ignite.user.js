var debug = $('<div id="debug-info"><dl></dl></div>'),
  list = debug.find("dl");

var typeStrings = {
  "r": "revision",
  "d": "date",
  "m": "machine"
}

$("body").contents().filter(function(){
  return this.nodeType == 8;
}).each(function(i, e){
  var values = $.trim(e.textContent).split(":");
  if(values.length >= 2) {
    list.append('<dt>' + typeStrings[values[0]] || values[0] + '</dt>');
    list.append('<dd>' + values[1] + '</dd>');
  }
});
$("body").append(debug);
