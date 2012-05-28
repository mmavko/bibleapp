
# ## Book
# 
# Book component displays data and manages scrolling.
#
# Fires following events:
# 
#   - `book/top_reached`
#   - `book/bottom_reached`
# 
# Listens to:
# 
#   - `server/data_loaded` -- displays (replaces/appends/prepends) data depending on inner flags

define [
    'cs!lib/controller'
    'text!./template.micro'
    'text!./verses.micro'
  ], (Controller, mainTmpl, versesTmpl) ->
  
    class Book extends Controller
      
      tagetTopOffset: 20
      loadMargin: 600
      
      elements:
        versesEl: '.verses'
        targetEl: '.target'
      
      _adjustHeight: =>
        @el.height window.innerHeight
      
      _scrollToTarget: ->
        @el.scrollTop @el.scrollTop()+@targetEl.position().top-@tagetTopOffset
      
      _measureTopScrollSpace: ->
        @el.scrollTop()
      
      _measureBottomScrollSpace: ->
        @versesEl.height() - @el.scrollTop() - @el.height()
      
      init: ->
        @mainTmpl = tmpl mainTmpl
        @versesTmpl = tmpl versesTmpl
        $(window).resize @_adjustHeight
        @_adjustHeight()
        @el.scroll @onScroll.debounce 200
        @el.html @mainTmpl {}
        @refreshElements()
        $.subscribe 'server/data_loaded', @data_loaded
      
      onScroll: =>
        $.publish 'book/top_reached'    if @_measureTopScrollSpace()    < @loadMargin
        $.publish 'book/bottom_reached' if @_measureBottomScrollSpace() < @loadMargin
      
      data_loaded: (ev, data) =>
        if data.reload
          @versesEl.html @versesTmpl data
          @refreshElements()
          @_scrollToTarget()
        if data.append
          @versesEl.append @versesTmpl data
        if data.prepend
          oldHeight = @versesEl.height()
          @versesEl.prepend @versesTmpl data
          @el.scrollTop @el.scrollTop() + @versesEl.height() - oldHeight
