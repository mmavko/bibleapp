
# ## BibleApp
#
# Fires 'page/loaded' event.

define [
    'cs!app/book/book'
    'cs!app/toc'
    'cs!app/server'
  ], 
  (Book, TOC, Server) ->
    run: ->
      book = new Book $ '#book'
      server = new Server
      book.init()
      server.init()
