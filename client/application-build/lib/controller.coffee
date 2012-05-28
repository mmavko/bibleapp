
define ->
  
  class Controller
    constructor: (@el) ->
    elements: {}
    refreshElements: =>
      for name, selector of @elements
        @[name] = @el.find(selector).first()
      null

  window.Controller = Controller
