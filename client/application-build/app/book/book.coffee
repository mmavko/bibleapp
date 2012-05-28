
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
      elements:
        versesEl: '.verses'

      init: =>
        @mainTmpl = tmpl mainTmpl
        @versesTmpl = tmpl versesTmpl
        @el.html @mainTmpl {}
        @refreshElements()
        $.subscribe 'server/data_loaded', @data_loaded

      data_loaded: (ev, data) =>
        @versesEl.html @versesTmpl data
