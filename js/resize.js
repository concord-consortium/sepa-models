// var MAX_WIDTH = 1500;
// var MAX_HEIGHT = 750;

function sizeContentsToWindow(evt, graphsOnly) {
  var modelHeight, modelWidth;

  if (graphsOnly) {
    modelWidth = $("#charts").width();
    modelHeight = $("#charts").height();
  } else {
    modelWidth = $(".toolbar").width();
    modelHeight = $("#environment").height() + $(".toolbar").height();
  }

  if (modelWidth === 0 || modelHeight === 0) {
    window.setTimeout(sizeContentsToWindow, 200);
    return;
  }

  var pageWidth = window.innerWidth;
  var pageHeight = window.innerHeight;

  // var desiredWidth = Math.min(pageWidth, MAX_WIDTH);
  // var desiredHeight = Math.min(pageHeight, MAX_HEIGHT);

  // console.log(graphsOnly, modelHeight, desiredHeight, modelWidth, desiredWidth)

  var smallestRatio = Math.min(pageWidth/modelWidth, pageHeight/modelHeight);
  console.log(smallestRatio);

  var transformation = 'scale('+smallestRatio+')';

  // if (smallestRatio > 1 && !graphsOnly) {
  //   var offset = Math.min(50, 300 * (smallestRatio - 1));
  //   transformation += ' translate('+offset+'px, '+offset+'px)';
  // }

  $("body").css({'transform': transformation, 'transform-origin': '0 0'});
}

$().ready(sizeContentsToWindow);
$(window).resize(sizeContentsToWindow);


/*!
* screenfull
* v3.3.2 - 2017-10-27
* (c) Sindre Sorhus; MIT License
*/

!function(){"use strict";var a="undefined"!=typeof window&&void 0!==window.document?window.document:{},b="undefined"!=typeof module&&module.exports,c="undefined"!=typeof Element&&"ALLOW_KEYBOARD_INPUT"in Element,d=function(){for(var b,c=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],d=0,e=c.length,f={};d<e;d++)if((b=c[d])&&b[1]in a){for(d=0;d<b.length;d++)f[c[0][d]]=b[d];return f}return!1}(),e={change:d.fullscreenchange,error:d.fullscreenerror},f={request:function(b){var e=d.requestFullscreen;b=b||a.documentElement,/ Version\/5\.1(?:\.\d+)? Safari\//.test(navigator.userAgent)?b[e]():b[e](c&&Element.ALLOW_KEYBOARD_INPUT)},exit:function(){a[d.exitFullscreen]()},toggle:function(a){this.isFullscreen?this.exit():this.request(a)},onchange:function(a){this.on("change",a)},onerror:function(a){this.on("error",a)},on:function(b,c){var d=e[b];d&&a.addEventListener(d,c,!1)},off:function(b,c){var d=e[b];d&&a.removeEventListener(d,c,!1)},raw:d};if(!d)return void(b?module.exports=!1:window.screenfull=!1);Object.defineProperties(f,{isFullscreen:{get:function(){return Boolean(a[d.fullscreenElement])}},element:{enumerable:!0,get:function(){return a[d.fullscreenElement]}},enabled:{enumerable:!0,get:function(){return Boolean(a[d.fullscreenEnabled])}}}),b?module.exports=f:window.screenfull=f}();

if (screenfull.enabled) {
	screenfull.on('change', function () {
		if (screenfull.isFullscreen) {
      $('#fullscreen-button').addClass("exit");
    } else {
      $('#fullscreen-button').removeClass("exit");
    }
	});
}

$('#fullscreen-button').click(function() {
  if (screenfull.enabled) {
    screenfull.toggle();
  }
})