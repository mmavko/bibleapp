
# ## Server
# 
# Server component is responsible for communication with server.
# It also:
#
#   - guarantees the correct AJAX order
# 
# Fires following events:
# 
#   - `server/data_loaded` -- contains loaded data and meta-data about event cause
# 
# Listens to:
# 
#   - `toc/goto_verse` -- fires `data_loaded`
#   - `book/top_reached` -- fires `data_loaded`
#   - `book/bottom_reached` -- fires `data_loaded`


define -> new Server

class Server
  init: ->
    data = []
    for i in [1..100]
      data.push
        b: 'gen'
        c: 1
        v: i
        t: "Verse text for verse number #{i} of book 'gen1'."
    $.publish 'server/data_loaded', verses: data
