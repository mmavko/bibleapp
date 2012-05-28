
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
    
    init: ->
      $.subscribe 'toc/goto_verse', @tocGotoVerse
      $.subscribe 'book/top_reached', @bookTopReached
      $.subscribe 'book/bottom_reached', @bookBottomReached
    
    _getTestData: (number=100, book='gen', chapter=1) ->
      verses = []
      for i in [1..number]
        verses.push
          b: book
          c: chapter
          v: i
          t: "Verse text for verse number #{i} of book '#{book}#{chapter}' and some more text."
      verses
    
    tocGotoVerse: =>
      data =
        verses: @_getTestData 100
        reload: yes
      data.verses[39].target = yes
      $.publish 'server/data_loaded', data
    
    bookTopReached: =>
      data =
        verses: @_getTestData 100
        prepend: yes
      $.publish 'server/data_loaded', data
    
    bookBottomReached: =>
      data =
        verses: @_getTestData 100
        append: yes
      $.publish 'server/data_loaded', data
