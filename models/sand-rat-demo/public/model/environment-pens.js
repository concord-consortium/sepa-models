// Generated by CoffeeScript 1.9.1
(function() {
  var Environment, Rule, env;

  Environment = require('models/environment');

  Rule = require('models/rule');

  env = new Environment({
    columns: 100,
    rows: 70,
    imgPath: "images/environments/field-pens.png",
    wrapEastWest: false,
    wrapNorthSouth: false,
    barriers: [[0, 330, 1000, 30], [485, 0, 30, 340]]
  });

  env.addRule(new Rule({
    test: function(agent) {
      return agent.species.speciesName === "sandrats" && agent.get('chow') && agent.get('weight') < 220 && Math.random() < 0.15;
    },
    action: function(agent) {
      return agent.set('weight', agent.get('weight') + Math.floor(Math.random() * 5));
    }
  }));

  env.addRule(new Rule({
    test: function(agent) {
      return agent.species.speciesName === "sandrats" && agent.get('chow') !== true && agent.get('weight') > 155 && Math.random() < 0.15;
    },
    action: function(agent) {
      return agent.set('weight', agent.get('weight') - Math.floor(Math.random() * 5));
    }
  }));

  env.addRule(new Rule({
    test: function(agent) {
      var w;
      return agent.species.speciesName === "sandrats" && agent.get('has diabetes') !== true && agent.get('prone to diabetes') === 'prone' && (w = agent.get('weight')) > 170 && Math.random() < (((w - 170) / 30) * 0.1);
    },
    action: function(agent) {
      return agent.set('has diabetes', true);
    }
  }));

  env.addRule(new Rule({
    test: function(agent) {
      var w;
      return agent.species.speciesName === "sandrats" && agent.get('has diabetes') === true && (w = agent.get('weight')) < 170 && Math.random() < ((-(w - 170) / 20) * 0.1);
    },
    action: function(agent) {
      return agent.set('has diabetes', false);
    }
  }));

  require.register("environments/field", function(exports, require, module) {
    return module.exports = env;
  });

}).call(this);
