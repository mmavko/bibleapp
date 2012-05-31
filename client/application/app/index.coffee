
# ## BibleApp
#
# Fires `page/loaded` and `page/resize` events.

define [
    'cs!app/book/book'
    'cs!app/toc/toc'
    'cs!app/server'
  ], 
  (Book, TOC, Server) ->
    
    run: ->
      
      book = new Book $ '#book'
      server = new Server
      toc = new TOC $ '#toc'
      book.init()
      server.init()
      toc.init()
      
      $(window).resize ->
        $.publish 'page/resize'
      
      $.publish 'page/loaded'
