// Generated by CoffeeScript 1.9.1
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  require.register("species/sandrats", function(exports, require, module) {
    var AnimatedAgent, BasicAnimal, SandRat, Species, Trait, biologicaSpecies, helpers;
    helpers = require('helpers');
    Species = require('models/species');
    BasicAnimal = require('models/agents/basic-animal');
    AnimatedAgent = require('models/agents/animated-agent');
    Trait = require('models/trait');
    biologicaSpecies = require('species/biologica/sandrats');
    if (window.orgNumber == null) {
      window.orgNumber = 1;
    }
    SandRat = (function(superClass) {
      extend(SandRat, superClass);

      function SandRat() {
        return SandRat.__super__.constructor.apply(this, arguments);
      }

      SandRat.prototype.moving = false;

      SandRat.prototype.moveCount = 0;

      SandRat.prototype.step = function() {
        var overcrowded;
        this.wander();
        this._incrementAge();
        if (this.get('age') > this.species.defs.MATURITY_AGE) {
          this.set('current behavior', BasicAnimal.BEHAVIOR.MATING);
        }
        overcrowded = false;
        if (!this._isInPensModel) {
          overcrowded = model.current_counts.all.total > 46;
        } else {
          if (this._x < model.env.width / 3) {
            overcrowded = model.current_counts.w.total > 30;
          } else if (this._y < model.env.height / 2) {
            overcrowded = model.current_counts.ne.total > 30;
          } else {
            overcrowded = model.current_counts.se.total > 30;
          }
        }
        if (!overcrowded && this.get('age') > 170 && this.get('sex') === 'male' && this._timeLastMated < 0 && Math.random() < 0.3) {
          this.mate();
        }
        if (this.get('age') > 180 && this._timeLastMated > 0) {
          this.die();
        }
        if (overcrowded && this.get('age') > 250 && Math.random() < 0.2) {
          this.die();
        }
        if (this.get('age') > 400 && Math.random() < 0.2) {
          return this.die();
        }
      };

      SandRat.prototype.makeNewborn = function() {
        var sex;
        SandRat.__super__.makeNewborn.call(this);
        sex = model.env.agents.length && model.env.agents[model.env.agents.length - 1].species.speciesName === "sandrats" && model.env.agents[model.env.agents.length - 1].get("sex") === "female" ? "male" : "female";
        this.set('sex', sex);
        this.set('age', Math.floor(Math.random() * 80));
        this.set('weight', 140 + Math.floor(Math.random() * 20));
        this.set('has diabetes', false);
        return this._isInPensModel = model.env.barriers.length > 0;
      };

      SandRat.prototype.mate = function() {
        var max, nearest;
        nearest = this._nearestMate();
        if (nearest != null) {
          this.chase(nearest);
          if (nearest.distanceSq < Math.pow(this.get('mating distance'), 2) && ((this.species.defs.CHANCE_OF_MATING == null) || Math.random() < this.species.defs.CHANCE_OF_MATING)) {
            max = this.get('max offspring');
            this.set('max offspring', Math.max(max, 1));
            this.reproduce(nearest.agent);
            this.set('max offspring', max);
            this._timeLastMated = this.environment.date;
            return nearest.agent._timeLastMated = this.environment.date;
          }
        } else {
          return this.wander(this.get('speed') * Math.random() * 0.75);
        }
      };

      SandRat.prototype.resetGeneticTraits = function() {
        SandRat.__super__.resetGeneticTraits.call(this);
        this.set('genome', this._genomeButtonsString());
        return this.set('prone to diabetes', this.get('red diabetes') !== 'none' || this.get('yellow diabetes') !== 'none' || this.get('blue diabetes') !== 'none');
      };

      SandRat.prototype._genomeButtonsString = function() {
        var alleles;
        alleles = this.organism.getAlleleString().replace(/a:/g, '').replace(/b:/g, '').replace(/,/g, '');
        alleles = alleles.replace(/d[ryb]b/g, '<span class="allele black"></span>');
        alleles = alleles.replace(/DR/g, '<span class="allele red"></span>');
        alleles = alleles.replace(/DY/g, '<span class="allele yellow"></span>');
        alleles = alleles.replace(/DB/g, '<span class="allele blue"></span>');
        return alleles;
      };

      return SandRat;

    })(BasicAnimal);
    return module.exports = new Species({
      speciesName: "sandrats",
      agentClass: SandRat,
      geneticSpecies: biologicaSpecies,
      defs: {
        CHANCE_OF_MUTATION: 0,
        INFO_VIEW_SCALE: 2,
        MATURITY_AGE: 20,
        INFO_VIEW_PROPERTIES: {
          "Weight (g):": 'weight',
          "": 'genome'
        }
      },
      traits: [
        new Trait({
          name: 'speed',
          "default": 6
        }), new Trait({
          name: 'vision distance',
          "default": 10000
        }), new Trait({
          name: 'mating distance',
          "default": 10000
        }), new Trait({
          name: 'max offspring',
          "default": 3
        }), new Trait({
          name: 'min offspring',
          "default": 2
        }), new Trait({
          name: 'weight',
          min: 140,
          max: 160
        }), new Trait({
          name: 'prone to diabetes',
          "default": false
        }), new Trait({
          name: 'red diabetes',
          possibleValues: [''],
          isGenetic: true,
          isNumeric: false
        }), new Trait({
          name: 'yellow diabetes',
          possibleValues: [''],
          isGenetic: true,
          isNumeric: false
        }), new Trait({
          name: 'blue diabetes',
          possibleValues: [''],
          isGenetic: true,
          isNumeric: false
        }), new Trait({
          name: 'has diabetes',
          "default": false
        })
      ],
      imageProperties: {
        initialFlipDirection: "right"
      },
      imageRules: [
        {
          name: 'diabetic',
          contexts: ['environment'],
          rules: [
            {
              image: {
                path: "images/agents/diabetic-stack.png",
                scale: 0.5,
                anchor: {
                  x: 0.5,
                  y: 0.7
                }
              },
              useIf: function(agent) {
                return model.showDiabetic && agent.get('has diabetes');
              }
            }
          ]
        }, {
          name: 'prone',
          contexts: ['environment'],
          rules: [
            {
              image: {
                path: "images/agents/prone-stack.png",
                scale: 0.5,
                anchor: {
                  x: 0.5,
                  y: 0.7
                }
              },
              useIf: function(agent) {
                return model.showPropensity && agent.get('prone to diabetes');
              }
            }
          ]
        }, {
          name: 'sex',
          contexts: ['environment'],
          rules: [
            {
              image: {
                path: "images/agents/female-stack.png",
                scale: 0.5,
                anchor: {
                  x: 0.5,
                  y: 0.7
                }
              },
              useIf: function(agent) {
                return model.showSex && agent.get('sex') === 'male';
              }
            }, {
              image: {
                path: "images/agents/male-stack.png",
                scale: 0.5,
                anchor: {
                  x: 0.5,
                  y: 0.7
                }
              },
              useIf: function(agent) {
                return model.showSex && agent.get('sex') === 'female';
              }
            }
          ]
        }, {
          name: 'rats',
          contexts: ['environment', 'carry-tool'],
          rules: [
            {
              image: {
                path: "images/agents/sandrat-stack.png",
                scale: 0.7,
                anchor: {
                  x: 0.5,
                  y: 0.6
                }
              },
              useIf: function(agent) {
                return agent.get('weight') > 180;
              }
            }, {
              image: {
                path: "images/agents/sandrat-stack.png",
                scale: 0.5,
                anchor: {
                  x: 0.5,
                  y: 0.7
                }
              }
            }
          ]
        }, {
          name: 'rats info tool',
          contexts: ['info-tool'],
          rules: [
            {
              image: {
                path: "images/agents/sandrat-stack.png",
                scale: 0.5,
                anchor: {
                  x: 0.5,
                  y: 0.7
                }
              }
            }
          ]
        }
      ]
    });
  });

}).call(this);
