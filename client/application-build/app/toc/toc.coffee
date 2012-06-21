
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
      CHAPTERS_SHOWUP_DELAY: 300
      CHAPTERS_HIDE_DELAY: 200
      
      lastHoveredBook: null
      canHideChapters: yes
      
      elements:
        booksEl: '.books'
      
      events:
        'click .book, .book .chapters span': 'bookClicked'
        'mouseenter .book': 'bookMouseover'
        'mouseleave .book': 'bookMouseout'
        'mouseenter .book .chapters': 'chaptersMouseover'
        'mouseleave .book .chapters': 'chaptersMouseout'
      
      init: ->
        
        @mainTmpl  = tmpl mainTmpl
        @booksTmpl = tmpl booksTmpl
        @el.html @mainTmpl {}
        @refreshElements()
        @booksEl.html @booksTmpl books: books
        
        @showChapters = @showChapters.debounce @CHAPTERS_SHOWUP_DELAY
        
        $.subscribe 'page/resize', @_adjustHeight
        @_adjustHeight()
        $.subscribe 'page/loaded', => @_goto @DEFAULT_TARGET
      
      _adjustHeight: =>
        marginTop    = parseInt @el.css('margin-top').replace('px', ''), 10
        marginBottom = parseInt @el.css('margin-bottom').replace('px', ''), 10
        @el.height window.innerHeight - marginTop - marginBottom
      
      _goto: (verse) ->
        $.publish 'toc/goto_verse', target: verse
      
      bookClicked: (ev) =>
        return if $(ev.target).is('.chapters')
        @_goto $(ev.currentTarget).attr('data-target')
        ev.stopPropagation()
      
      bookMouseover: (ev) =>
        @lastHoveredBook = $ ev.currentTarget
        @showChapters()
      
      bookMouseout: =>
        @lastHoveredBook = null
        @canHideChapters = yes
        @hideChapters()
      
      chaptersMouseover: =>
        @canHideChapters = no
      
      chaptersMouseout: =>
        @canHideChapters = yes
      
      showChapters: =>
        @hideChapters(yes)
        bookEl = @lastHoveredBook
        return unless bookEl
        chaptersEl = bookEl.find('.chapters')
        bottomMargin = 10
        totalHeight = bookEl.position().top + chaptersEl.outerHeight() + bottomMargin
        containerHeight = @el.height()
        if totalHeight + bookEl.outerHeight() > containerHeight
          top = containerHeight - totalHeight
          chaptersEl.css 'top', "#{top}px"
        chaptersEl.show()
      
      hideChapters: (immediately = no) =>
        hide = =>
          @el.find('.book .chapters').hide().css('top', 'auto')
        if immediately
          hide()
        else
          setTimeout =>
            hide() if @canHideChapters
          , @CHAPTERS_HIDE_DELAY
