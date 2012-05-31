
define ->

  # Inspired by Spine.js Controller
  class Controller

    constructor: (@el) ->
      @delegateEvents(@events) if @events
      @refreshElements() if @elements

    delegateEvents: (events) ->
      eventSplitter = /^(\S+)\s*(.*)$/
      
      for key, method of events

        if typeof(method) is 'function'
          # Always return true from event handlers
          method = do (method) => =>
            method.apply(this, arguments)
            true
        else
          method = do (method) => =>
            @[method].apply(this, arguments)
            true

        match      = key.match(eventSplitter)
        eventName  = match[1]
        selector   = match[2]

        if selector is ''
          @el.bind(eventName, method)
        else
          @el.delegate(selector, eventName, method)

    refreshElements: ->
      for name, selector of @elements
        @[name] = @el.find(selector).first()
      null

  window.Controller = Controller
