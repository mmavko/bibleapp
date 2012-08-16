
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
      
      TARGET_TOP_OFFSET: 100
      LOAD_MARGIN: 600
      
      elements:
        versesEl: '.verses'
        targetEl: '.target'
      
      _adjustHeight: =>
        @el.height window.innerHeight
      
      _scrollToTarget: ->
        @el.scrollTop @el.scrollTop() + @targetEl.position().top - @TARGET_TOP_OFFSET
      
      _measureTopScrollSpace: ->
        @el.scrollTop()
      
      _measureBottomScrollSpace: ->
        @versesEl.height() - @el.scrollTop() - @el.height()
      
      init: ->
        @mainTmpl = tmpl mainTmpl
        @versesTmpl = tmpl versesTmpl
        $.subscribe 'page/resize', @_adjustHeight
        @_adjustHeight()
        @el.scroll @onScroll.debounce 200
        @el.html @mainTmpl {}
        @refreshElements()
        $.subscribe 'server/data_loaded', @data_loaded
      
      onScroll: =>
        @showHeader()
        @publishEvents()

      showHeader: ->
        TOP_MIN = -100
        TOP_MAX = 600
        currentHeader = @versesEl.find('h3:not(.fixed)').filter( -> $(this).offset().top < TOP_MIN ).last().get(0)
        currentHeader and= $ currentHeader
        if currentHeader
          unless currentHeader.is @currentHeader
            @currentHeader = currentHeader
            if @fixedHeader
              @fixedHeader.html @currentHeader.html()
            else
              @fixedHeader = @currentHeader.clone()
              @fixedHeader.addClass 'fixed'
              @fixedHeader.hide()
              @versesEl.append @fixedHeader
          nextHeader = @currentHeader.nextAll('h3:not(.fixed, .fake)').get(0)
          nextHeader and= $ nextHeader
        if @fixedHeader
          if currentHeader and (not nextHeader or nextHeader.offset().top > TOP_MAX)
            @fixedHeader.fadeIn 'fast'
          else
            @fixedHeader.fadeOut 'fast'

      publishEvents: ->
        $.publish 'book/top_reached'    if @_measureTopScrollSpace()    < @LOAD_MARGIN
        $.publish 'book/bottom_reached' if @_measureBottomScrollSpace() < @LOAD_MARGIN

      _refreshDOM: () ->
        $('.verses .c, .verses .target').prev('.v').addClass 'last'
        @versesEl.append @fixedHeader if @fixedHeader
        @refreshElements()

      data_loaded: (ev, data) =>
        if data.reload
          @versesEl.html @versesTmpl data
          @_refreshDOM()
          @_scrollToTarget()
        if data.append
          @versesEl.append @versesTmpl data
          @_refreshDOM()
        if data.prepend
          oldHeight = @versesEl.height()
          @versesEl.prepend @versesTmpl data
          @_refreshDOM()
          @el.scrollTop @el.scrollTop() + @versesEl.height() - oldHeight
