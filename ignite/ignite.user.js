var debug = $('<div id="debug-info" class="well"><dl></dl></div>'),
  leftPosition = (localStorage['ignite-debug-position-left'] || 0) + "px",
  topPosition = (localStorage['ignite-debug-position-top'] || 200) + "px";

debug.css({
  position: "absolute",
  left: leftPosition,
  top: topPosition,
  width: 300,
  backgroundColor: "white"
});

$("body").contents().filter(function(){
  return this.nodeType == 8;
}).each(function(i, e){
  var values = $.trim(e.textContent).split(":"),
    list = debug.find("dl");
  list.append('<dt>' + values[0] + '</dt>');
  list.append('<dd>' + values[1] + '</dd>');
});
$("body").append(debug);

debug.draggable({
  stop: function(event, ui) {
    localStorage['ignite-debug-position-left'] = $(this).position().left;
    localStorage['ignite-debug-position-top'] = $(this).position().top;
  }
});
