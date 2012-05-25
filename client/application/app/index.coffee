
# ## BibleApp
#
# Fires 'page/loaded' event.

define [
    'cs!app/book'
    'cs!app/toc'
    'cs!app/server'
  ], 
  (book, toc, server) ->
    run: ->
      book.init $ '#book'
      server.init()
