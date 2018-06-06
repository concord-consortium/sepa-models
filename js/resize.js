var MAX_WIDTH = 1312;
var MAX_HEIGHT = 700;

function sizeContentsToWindow() {
  var modelWidth = $(".toolbar").width();
  var modelHeight = $("#environment").height() + $(".toolbar").height();

  if (modelWidth === 0 || modelHeight === 0) {
    window.setTimeout(sizeContentsToWindow, 200);
    return;
  }

  var pageWidth = window.innerWidth;
  var pageHeight = window.innerHeight;

  var desiredWidth = Math.min(pageWidth, MAX_WIDTH);
  var desiredHeight = Math.min(pageHeight, MAX_HEIGHT);

  var smallestRatio = Math.min(desiredWidth/modelWidth, desiredHeight/modelHeight);

  $("body").css({'transform': 'scale('+smallestRatio+')', 'transform-origin': '0 0'});

  if (smallestRatio > 1) {
    var offset = 20 * (smallestRatio - 1) * 5;
    $("body").css({'transform': 'translate('+offset+'px, '+offset+'px)'});
  }
}

$().ready(sizeContentsToWindow);
$(window).resize(sizeContentsToWindow);
$(window).on('shutterbug-asyouwere', sizeContentsToWindow);