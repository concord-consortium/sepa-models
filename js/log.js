function setupLogging() {
  if ($(".info-tool").length < 1) {
    setTimeout(setupLogging, 200);
    return;
  }
  if (iframePhone) {
    var phone = iframePhone.getIFrameEndpoint();
    phone.initialize();

    function log(action, data) {
      if (data == null) {
        data = {};
      }
      data.model = window.MODEL_NAME || "Sand Rats Model";
      console.log("%c Logging:", 'color: #f99a00', action, JSON.stringify(data));
      phone.post('log', {action: action, data: data});
    };

    document.addEventListener("environment-start", function() {
      log('Model Start');
    });
    document.addEventListener("environment-reset", function() {
      log('Model Reset');
    });
    document.addEventListener("environment-stop", function() {
      log('Model Stop');
    });
    $(".info-tool").on('mousedown', function() {
      log('Select Magnifying Glass');
    });
    $(".carry-tool").on('mousedown', function() {
      log('Select Carry Tool');
    });
    $(".chow-toggle.north-east").on('click', function() {
      setTimeout(function() {
        var action = 'Add Sugar';
        if (!$(".chow-toggle.north-east").hasClass("on")) {
          action = 'Remove Sugar';
        }
        log(action, {pen: "Top"});
      }, 50);
    });
    $(".chow-toggle.south-east").on('click', function() {
      setTimeout(function() {
        var action = 'Add Sugar';
        if (!$(".chow-toggle.south-east").hasClass("on")) {
          action = 'Remove Sugar';
        }
        log(action, {pen: "Bottom"});
      }, 50);
    });
    $('#view-prone-check').on('click', function() {
      var action = 'Show Info Ring';
      if (!$(this).is(':checked')) {
        action = 'Hide Info Ring';
      }
      log(action, {type: "Risk"});
    });
    $('#view-sex-check').on('click', function() {
      var action = 'Show Info Ring';
      if (!$(this).is(':checked')) {
        action = 'Hide Info Ring';
      }
      log(action, {type: "Sex"});
    });
    $('#view-diabetic-check').on('click', function() {
      var action = 'Show Info Ring';
      if (!$(this).is(':checked')) {
        action = 'Hide Info Ring';
      }
      log(action, {type: "Diabetes"});
    });
    $('#chart-1-selector').change(function() {
      log("Set Chart Type", {pen: "Top", type: this.value});
    });
    $('#chart-2-selector').change(function() {
      log("Set Chart Type", {pen: "Bottom", type: this.value});
    });
  }
}
setupLogging();