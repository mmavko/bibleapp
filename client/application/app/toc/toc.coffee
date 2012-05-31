
# ## Table of Contents
# 
# TOC component.
#
# Fires following events:
# 
#   - `toc/goto_verse`
# 
# Listens to:
# 
#   - `page/loaded` -- fires `goto_verse` for default chapter


define [
    'cs!lib/controller'
    'text!./books.json'
    'text!./template.micro'
    'text!./books.micro'
  ],
  (Controller, booksJSON, mainTmpl, booksTmpl) ->
    
    books = JSON.parse booksJSON
    
    class TOC extends Controller
      
      DEFAULT_TARGET: 'gen'
      
      elements:
        booksEl: '.books'
      
      events:
        'click .book': 'bookClicked'

      init: ->
        
        @mainTmpl  = tmpl mainTmpl
        @booksTmpl = tmpl booksTmpl
        @el.html @mainTmpl {}
        @refreshElements()
        @booksEl.html @booksTmpl books: books
        
        $.subscribe 'page/resize', @_adjustHeight
        @_adjustHeight()
        $.subscribe 'page/loaded', => @_goto @DEFAULT_TARGET
      
      _adjustHeight: =>
        marginTop    = parseInt @el.css('margin-top').replace('px', ''), 10
        marginBottom = parseInt @el.css('margin-bottom').replace('px', ''), 10
        @el.height window.innerHeight - marginTop - marginBottom
      
      _goto: (verse) ->
        console.log "toc/goto_verse #{verse}"
        $.publish 'toc/goto_verse', target: verse
      
      bookClicked: (ev) =>
        @_goto $(ev.currentTarget).attr('data-target')
