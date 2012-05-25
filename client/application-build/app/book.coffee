
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


define -> new Book

class Book
  init: (parent_el) ->
    $.subscribe 'server/data_loaded', @data_loaded
  data_loaded: (ev, data) ->
    console.log "book got #{data.verses.length} verses"
