// Generated by CoffeeScript 1.9.1
(function() {
  var Agent, BasicAnimal, Environment, Events, Interactive, Species, ToolButton, Trait, chowSpecies, drawChart, drawCharts, env, helpers, sandratSpecies, startingRats;

  helpers = require('helpers');

  Environment = require('models/environment');

  Species = require('models/species');

  Agent = require('models/agent');

  Trait = require('models/trait');

  Interactive = require('ui/interactive');

  Events = require('events');

  ToolButton = require('ui/tool-button');

  BasicAnimal = require('models/agents/basic-animal');

  sandratSpecies = require('species/sandrats');

  chowSpecies = require('species/chow');

  env = require('environments/field');

  startingRats = 20;

  window.model = {
    run: function() {
      this.interactive = new Interactive({
        environment: env,
        toolButtons: [
          {
            type: ToolButton.INFO_TOOL
          }, {
            type: ToolButton.CARRY_TOOL
          }
        ]
      });
      document.getElementById('environment').appendChild(this.interactive.getEnvironmentPane());
      this.env = env;
      this.setupEnvironment();
      this.isSetUp = true;
      Events.addEventListener(Environment.EVENTS.RESET, (function(_this) {
        return function() {
          return _this.setupEnvironment();
        };
      })(this));
      Events.addEventListener(Environment.EVENTS.STEP, (function(_this) {
        return function() {
          _this.countRatsInAreas();
          return drawCharts();
        };
      })(this));
      return Events.addEventListener(Environment.EVENTS.AGENT_ADDED, function(evt) {
        if (evt.detail.agent.species === chowSpecies) {
          return;
        }
        return drawCharts();
      });
    },
    agentsOfSpecies: function(species) {
      var a, j, len, ref, set;
      set = [];
      ref = this.env.agents;
      for (j = 0, len = ref.length; j < len; j++) {
        a = ref[j];
        if (a.species === species) {
          set.push(a);
        }
      }
      return set;
    },
    countRatsInAreas: function() {
      var a;
      if (this.isFieldModel) {
        return this.count_all = ((function() {
          var j, len, ref, results;
          ref = this.env.agentsWithin({
            x: 0,
            y: 0,
            width: 600,
            height: 700
          });
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            a = ref[j];
            if (a.species === sandratSpecies) {
              results.push(a);
            }
          }
          return results;
        }).call(this)).length;
      } else {
        this.count_s = ((function() {
          var j, len, ref, results;
          ref = this.env.agentsWithin({
            x: 0,
            y: 350,
            width: 1000,
            height: 350
          });
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            a = ref[j];
            if (a.species === sandratSpecies) {
              results.push(a);
            }
          }
          return results;
        }).call(this)).length;
        this.count_nw = ((function() {
          var j, len, ref, results;
          ref = this.env.agentsWithin({
            x: 0,
            y: 0,
            width: 500,
            height: 350
          });
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            a = ref[j];
            if (a.species === sandratSpecies) {
              results.push(a);
            }
          }
          return results;
        }).call(this)).length;
        return this.count_ne = ((function() {
          var j, len, ref, results;
          ref = this.env.agentsWithin({
            x: 500,
            y: 0,
            width: 500,
            height: 350
          });
          results = [];
          for (j = 0, len = ref.length; j < len; j++) {
            a = ref[j];
            if (a.species === sandratSpecies) {
              results.push(a);
            }
          }
          return results;
        }).call(this)).length;
      }
    },
    countRats: function(chartN) {
      var a, data, graphLoc, graphType, j, k, len, len1, loc, rats, weight;
      data = {};
      loc = {
        x: 0,
        y: 0,
        width: 600,
        height: 700
      };
      graphLoc = chartN === 1 ? window.graph1Location : window.graph2Location;
      if (graphLoc === "s") {
        loc = {
          x: 0,
          y: 350,
          width: 1000,
          height: 350
        };
      } else if (graphLoc === "nw") {
        loc = {
          x: 0,
          y: 0,
          width: 500,
          height: 350
        };
      } else if (graphLoc === "ne") {
        loc = {
          x: 500,
          y: 0,
          width: 500,
          height: 350
        };
      }
      rats = (function() {
        var j, len, ref, results;
        ref = this.env.agentsWithin(loc);
        results = [];
        for (j = 0, len = ref.length; j < len; j++) {
          a = ref[j];
          if (a.species === sandratSpecies) {
            results.push(a);
          }
        }
        return results;
      }).call(this);
      graphType = chartN === 1 ? window.graphType : window.graph2Type;
      if (graphType === "diabetic") {
        data = {
          healthy: 0,
          diabetic: 0
        };
        for (j = 0, len = rats.length; j < len; j++) {
          a = rats[j];
          if (!a.get('has diabetes')) {
            data.healthy++;
          }
          if (a.get('has diabetes')) {
            data.diabetic++;
          }
        }
      } else if (graphType === "weight") {
        data = {
          140: 0
        };
        for (k = 0, len1 = rats.length; k < len1; k++) {
          a = rats[k];
          weight = Math.floor(a.get('weight') / 10) * 10;
          if (data[weight] == null) {
            data[weight] = 0;
          }
          data[weight]++;
        }
      }
      return data;
    },
    setupEnvironment: function() {
      var col, i, j, k, l, ref, row;
      for (col = j = 0; j <= 60; col = ++j) {
        for (row = k = 0; k <= 70; row = ++k) {
          this.env.set(col, row, "chow", false);
        }
      }
      for (i = l = 0, ref = startingRats; 0 <= ref ? l < ref : l > ref; i = 0 <= ref ? ++l : --l) {
        this.addRat();
      }
      $('#chow, #chow-s, #chow-nw, #chow-n, #chow-ne').attr('checked', false);
      this.count_all = 0;
      this.count_s = 0;
      this.count_nw = 0;
      this.count_ne = 0;
      return drawCharts();
    },
    addRat: function() {
      var rat, top;
      top = this.isFieldModel ? 0 : 350;
      rat = sandratSpecies.createAgent();
      rat.set('age', 20 + (Math.floor(Math.random() * 40)));
      rat.setLocation(env.randomLocationWithin(0, top, 600, 700, true));
      return this.env.addAgent(rat);
    },
    addChow: function(n, x, y, w, h) {
      var chow, i, j, ref, results;
      results = [];
      for (i = j = 0, ref = n; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        chow = chowSpecies.createAgent();
        chow.setLocation(env.randomLocationWithin(x, y, w, h, true));
        results.push(this.env.addAgent(chow));
      }
      return results;
    },
    removeChow: function(x, y, width, height) {
      var agent, agents, j, len;
      agents = env.agentsWithin({
        x: x,
        y: y,
        width: width,
        height: height
      });
      for (j = 0, len = agents.length; j < len; j++) {
        agent = agents[j];
        if (agent.species.speciesName === "chow") {
          agent.die();
        }
      }
      return this.env.removeDeadAgents();
    },
    setNWChow: function(chow) {
      var col, j, k, row;
      for (col = j = 0; j <= 30; col = ++j) {
        for (row = k = 0; k <= 33; row = ++k) {
          this.env.set(col, row, "chow", chow);
        }
      }
      if (chow) {
        return this.addChow(25, 0, 0, 500, 350);
      } else {
        return this.removeChow(0, 0, 500, 350);
      }
    },
    setNEChow: function(chow) {
      var col, j, k, row;
      for (col = j = 30; j <= 60; col = ++j) {
        for (row = k = 0; k <= 33; row = ++k) {
          this.env.set(col, row, "chow", chow);
        }
      }
      if (chow) {
        return this.addChow(25, 500, 0, 500, 350);
      } else {
        return this.removeChow(500, 0, 500, 350);
      }
    },
    setSChow: function(chow) {
      var col, j, k, row;
      for (col = j = 0; j <= 60; col = ++j) {
        for (row = k = 36; k <= 75; row = ++k) {
          this.env.set(col, row, "chow", chow);
        }
      }
      if (chow) {
        return this.addChow(70, 0, 350, 1000, 350);
      } else {
        return this.removeChow(0, 350, 1000, 350);
      }
    }
  };

  $(function() {
    model.isFieldModel = !/[^\/]*html/.exec(document.location.href) || /[^\/]*html/.exec(document.location.href)[0] === "field.html";
    model.isLifespanModel = /[^\/]*html/.exec(document.location.href) && /[^\/]*html/.exec(document.location.href)[0] === "lifespan.html";
    if (!model.isFieldModel) {
      window.graph1Location = "s";
    }
    if (model.isLifespanModel) {
      startingRats = 10;
    }
    helpers.preload([model, env, sandratSpecies], function() {
      return model.run();
    });
    $('#view-sex-check').change(function() {
      return model.showSex = $(this).is(':checked');
    });
    $('#view-prone-check').change(function() {
      return model.showPropensity = $(this).is(':checked');
    });
    $('#view-diabetic-check').change(function() {
      return model.showDiabetic = $(this).is(':checked');
    });
    $('#chow').change(function() {
      model.setNWChow($(this).is(':checked'));
      model.setNEChow($(this).is(':checked'));
      return model.setSChow($(this).is(':checked'));
    });
    $('#chow-nw').change(function() {
      return model.setNWChow($(this).is(':checked'));
    });
    $('#chow-ne').change(function() {
      return model.setNEChow($(this).is(':checked'));
    });
    $('#chow-s').change(function() {
      return model.setSChow($(this).is(':checked'));
    });
    $('#graph-selection').change(function() {
      window.graphType = $(this).val();
      return drawCharts();
    });
    $('#graph-selection-2').change(function() {
      window.graph2Type = $(this).val();
      return drawCharts();
    });
    $('#graph-location-selection').change(function() {
      window.graph1Location = $(this).val();
      return drawCharts();
    });
    return $('#graph-location-selection-2').change(function() {
      window.graph2Location = $(this).val();
      return drawCharts();
    });
  });

  window.graphType = "diabetic";

  window.graph1Location = "all";

  window.graph2Type = "diabetic";

  window.graph2Location = "nw";

  drawCharts = function() {
    drawChart(1);
    if (!model.isFieldModel) {
      return drawChart(2);
    }
  };

  drawChart = function(chartN) {
    var _data, chart, chartData, data, graphLoc, graphType, id, key, max, options, transformedData, view;
    if (!model.isSetUp) {
      return;
    }
    _data = model.countRats(chartN);
    graphType = chartN === 1 ? window.graphType : window.graph2Type;
    graphLoc = chartN === 1 ? window.graph1Location : window.graph2Location;
    max = graphLoc === "all" ? 60 : graphLoc === "s" ? 40 : 20;
    options = {
      title: "Sandrats in population",
      width: 300,
      height: 260,
      bar: {
        groupWidth: "95%"
      },
      legend: {
        position: "none"
      },
      vAxis: {
        viewWindowMode: 'explicit',
        viewWindow: {
          max: max,
          min: 0
        }
      }
    };
    if (graphType === "diabetic") {
      data = google.visualization.arrayToDataTable([
        [
          "Type", "Number of rats", {
            role: "style"
          }
        ], ["Non-diabetic", _data.healthy, "silver"], ["Diabetic", _data.diabetic, "brown"]
      ]);
      view = new google.visualization.DataView(data);
      view.setColumns([
        0, 1, {
          calc: "stringify",
          sourceColumn: 1,
          type: "string",
          role: "annotation"
        }, 2
      ]);
    } else if (graphType === "weight") {
      transformedData = {
        "< 150": {
          count: (_data[130] || 0) + (_data[140] || 0),
          color: "blue"
        },
        "150-159": {
          count: _data[150] || 0,
          color: "blue"
        },
        "160-169": {
          count: _data[160] || 0,
          color: "blue"
        },
        "170-179": {
          count: _data[170] || 0,
          color: "#df7c00"
        },
        "180-189": {
          count: _data[180] || 0,
          color: "#df7c00"
        },
        "> 190": {
          count: (_data[190] || 0) + (_data[200] || 0) + (_data[210] || 0) + (_data[220] || 0) + (_data[230] || 0),
          color: "#df7c00"
        }
      };
      chartData = [
        [
          "Type", "Number of rats", {
            role: "style"
          }
        ]
      ];
      for (key in transformedData) {
        chartData.push([key, transformedData[key].count, transformedData[key].color]);
      }
      data = google.visualization.arrayToDataTable(chartData);
      view = new google.visualization.DataView(data);
      view.setColumns([
        0, 1, {
          calc: "stringify",
          sourceColumn: 1,
          type: "string",
          role: "annotation"
        }, 2
      ]);
      options.title = "Weight of sandrats (g)";
    }
    id = chartN === 1 ? "field-chart" : "field-chart-2";
    chart = new google.visualization.ColumnChart(document.getElementById(id));
    return chart.draw(view, options);
  };

  google.load('visualization', '1', {
    packages: ['corechart', 'bar'],
    callback: drawCharts
  });

}).call(this);
