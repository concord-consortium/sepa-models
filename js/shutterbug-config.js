Shutterbug.enable('#charts');

$(window).on('shutterbug-saycheese', function() {
  $("body").css({'transform': 'scale(1)', 'transform-origin': '0 0'});
  $("body").css({'transform': 'translate(0px, 0px)'});

  $("#charts").addClass("big-snapshot");
  $("#environment").hide();
  $("#toolbar-options").hide();
  $("#chart-1-type-label").text($("#chart-1-selector option:selected").text());
  $("#chart-2-type-label").text($("#chart-2-selector option:selected").text());

  redrawCharts();
});

$(window).on('shutterbug-asyouwere', function() {
  $("#charts").removeClass("big-snapshot");
  $("#environment").show();
  $("#toolbar-options").show();

  redrawCharts();
});