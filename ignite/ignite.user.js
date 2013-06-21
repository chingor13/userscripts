var debug = $('<div id="debug-info" class="well"><dl></dl></div>'),
  leftPosition = ($.cookie('ignite-debug-position-left') || 0) + "px",
  topPosition = ($.cookie('ignite-debug-position-top') || 200) + "px";

debug.css({
  position: "absolute",
  left: leftPosition,
  top: topPosition,
  width: 300
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
    console.log(this);
    $.cookie('ignite-debug-position-left', $(this).position().left);
    $.cookie('ignite-debug-position-top', $(this).position().top);
    console.log(document.cookie);
  }
});
