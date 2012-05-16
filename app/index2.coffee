

modules =
  book:
    template: '''
              I have {{friends.length}} friends. They are:
              <ul>
                  <li ng:repeat="friend in friends" ng:eval="log('my:module')">
                  [{{$index + 1}}] {{friend.name}} who is {{friend.age}} years old.
                </li>
              </ul>
              '''
    controller: ->
      @friends = [
        name: 'John'
        age: 25
      ,
        name: 'Mary'
        age: 28
      ]
      @init = ->
        console.log 'books module init'
      @log = (msg) ->
        console.log "#{@$index} says: #{msg}"



angular.widget 'my:module', (compileElement) ->
  compiler = this
  moduleName = compileElement.attr 'name'
  {controller, template} = modules[moduleName] #TODO require here

  unless angular.isFunction controller
    throw "'#{moduleName}' module controller is not defined.";
  unless typeof template is 'string'
    throw "'#{moduleName}' module template is not defined.";

  if compileElement[0]['my:compiled']
    @descend yes
    @directives yes
    null
  else
    compileElement[0]['my:compiled'] = yes
    (linkElement) ->
      parentScope = this

      preventRecursion = no
      parentScope.$onEval ->
        unless preventRecursion
          preventRecursion = yes
          try
            childScope.$eval()
          finally
            preventRecursion = no

      linkElement.html template
      childScope = angular.scope parentScope
      childScope.$become controller
      compiler.compile(linkElement)(childScope)



