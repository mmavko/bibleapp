
# ## Server
# 
# Server component is responsible for communication with server.
# It works with concept of 'target verse'. For example, it can use API
# with following request object:
# 
#     {
#       target: 'john 1:1',
#       start: 100,
#       end: 500
#     }
# 
# This is going to return an array of 'verses' starting at 100 and ending with 500 relatively
# to 'john 1:1' (which has index of 0). If response array contains target verse that verse 
# should contain 'target' attribute.
# Negative values should also be supported.
# 
# Example of 'verse' structure:
# 
#     {
#       b: 'john',                 // book - required only if v==1
#       c: 1,                      // capter - required only if v==1
#       v: 1,                      // verse number
#       t: 'In the beginning...',  // text
#       target: true               // if target verse
#     }
# 
# The component also guarantees the correct AJAX order.
# 
# Fires following events:
# 
#   - `server/data_loaded` -- contains loaded data and meta-data about event cause
# 
# `server/data_loaded` event carries the following data object:
# 
#     {
#       verses: [],     // array of verses returned by server API
#       reload: true,   // if we get new data
#       append: true,   // if we get continuation at the end
#       prepend: true   // if we get continuation at the beginning
#     }
# 
# 
# Listens to:
# 
#   - `toc/goto_verse` -- fires `data_loaded`
#   - `book/top_reached` -- fires `data_loaded`
#   - `book/bottom_reached` -- fires `data_loaded`


define ->
  

  class Server
    
    API_URL: 'http://127.0.0.1:8888/api'
    PART_SIZE: 50
    
    init: ->
      $.subscribe 'toc/goto_verse', @tocGotoVerse
      $.subscribe 'book/top_reached', @bookTopReached
      $.subscribe 'book/bottom_reached', @bookBottomReached
    
    _loadData: (params) ->
      if params.reload
        @prependCount = @appendCount = 0
        @beginningReached = @endReached = no
        @currentTargetVerse = params.target
        start = -@PART_SIZE
        end   = 2 * @PART_SIZE
      else if params.prepend
        return if @beginningReached
        start = -(@prependCount + 2) * @PART_SIZE
        end   = -(@prependCount + 1) * @PART_SIZE
      else if params.append
        return if @endReached
        start = (@appendCount + 2) * @PART_SIZE
        end   = (@appendCount + 3) * @PART_SIZE
      requestData =
        target: @currentTargetVerse
        start: start
        end: end
      $.getJSON @API_URL, requestData, (responseData) =>
        @prependCount++ if params.prepend
        @appendCount++  if params.append
        @beginningReached = yes if responseData.beginningReached
        @endReached       = yes if responseData.endReached
        params.verses = responseData.verses
        $.publish 'server/data_loaded', params
    
    tocGotoVerse: (ev, data) =>
      data.reload = yes
      @_loadData data
    
    bookTopReached: (ev, data = {}) =>
      data.prepend = yes
      @_loadData data
    
    bookBottomReached: (ev, data = {}) =>
      data.append = yes
      @_loadData data
