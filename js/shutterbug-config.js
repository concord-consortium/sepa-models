Shutterbug.enable('#charts');

$(window).on('shutterbug-saycheese', function() {
  $("#charts").addClass("big-snapshot");
  $("#environment").hide();
  $("#toolbar-options").hide();
  $("#chart-1-type-label").text($("#chart-1-selector option:selected").text())
  $("#chart-2-type-label").text($("#chart-2-selector option:selected").text())
  redrawCharts();
});

$(window).on('shutterbug-asyouwere', function() {
  $("#charts").removeClass("big-snapshot");
  $("#environment").show();
  $("#toolbar-options").show();
  redrawCharts();
});