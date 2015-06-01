Environment   = require 'models/environment'
Rule          = require 'models/rule'

env = new Environment
  columns:  100
  rows:     70
  imgPath: "images/environments/field.png"
  wrapEastWest: false
  wrapNorthSouth: false

env.addRule new Rule
  test: (agent)->
    return agent.species.speciesName is "sandrats" and
            agent.get('has diabetes') isnt true and
            agent.get('prone to diabetes') is 'prone' and
            agent.get('chow') and
            Math.random() < 0.015
  action: (agent) ->
    agent.set 'has diabetes', true

env.addRule new Rule
  test: (agent)->
    return  agent.species.speciesName is "sandrats" and
            agent.get('has diabetes') and
            agent.get('prone to diabetes') is 'prone' and
            agent.get('chow') isnt true and
            Math.random() < 0.015
  action: (agent) ->
    agent.set 'has diabetes', false

require.register "environments/field", (exports, require, module) ->
  module.exports = env
