fs = require("fs")
http = require("http")
url = require("url")

utils =
  # returns shallow copy of object
  clone: (obj) ->
    copy = {}
    for prop, value of obj
      copy[prop] = value if obj.hasOwnProperty prop
    return copy

port = process.argv[2] or 8888

bible = JSON.parse fs.readFileSync('data/bible.json', 'utf8')

http.createServer( (request, response) ->
  
  logRequest = ->
    console.log "\n\n REQUEST #{request.method} #{request.url}"
    console.log request.headers
  
  logResponse = ->
    console.log "\n RESPONSE #{response.statusCode}"
  
  respond404 = ->
    headers =
      "Content-Type": "text/plain"
      "Access-Control-Allow-Origin": '*'
    response.writeHead 404, headers
    response.write "404 Not Found\n"
    response.end()
    logResponse()
  
  respond500 = (err = 'Internal Server Error') ->
    console.log "ERROR #{err}"
    headers =
      "Content-Type": "text/plain"
      "Access-Control-Allow-Origin": '*'
    response.writeHead 500, headers
    response.write err + "\n"
    response.end()
    logResponse()
  
  respond200 = (data, mode) ->
    headers =
      "Access-Control-Allow-Origin": '*'
    response.writeHead 200, headers
    response.write data, mode
    response.end()
    logResponse()
  
  # respondCORS = ->
  #   headers =
  #     "Access-Control-Allow-Origin"      : '*'
  #     "Access-Control-Allow-Methods"     : "POST, GET, PUT, DELETE, OPTIONS"
  #     "Access-Control-Allow-Credentials" : true
  #     "Access-Control-Max-Age"           : '86400' # 24 hours
  #     "Access-Control-Allow-Headers"     : "X-Requested-With, Access-Control-Allow-Origin, X-HTTP-Method-Override, Content-Type, Authorization, Accept"
  #   response.writeHead 200, headers
  #   response.end()
  #   console.log response.toString()
  
  try
    logRequest()
  
    # # CORS capability
    # if request.method is 'OPTIONS'
    #   respondCORS()
    #   return
  
    urlData = url.parse(request.url, yes)
  
    if request.method is 'GET' and urlData.pathname is '/api'
    
      respond = {}
    
      {target, start, end} = urlData.query
      matches = target.match /(\d*\s*[^\d]+)(\d+)?[:\s\-]?(.+)?/
    
      # parse target verse data
      tv =
        book:    matches[1].replace /\s/g, ''
        chapter: parseInt(matches[2], 10) or 1
        verse:   parseInt(matches[3], 10) or 1
    
      start = parseInt start, 10
      end   = parseInt end, 10
      if start is NaN then start = -50
      if end   is NaN then end   = 100
    
      # find target verse index
      targetIndex = null
      for verse, i in bible
        if verse.b is tv.book and verse.c is tv.chapter and verse.v is tv.verse
          targetIndex = i
          break
    
      # respond 500 if no verse found
      if targetIndex is null
        respond500 JSON.stringify
          error: 'Wrong verse'
          verse: tv
        return
    
      startIndex = targetIndex + start
      endIndex   = targetIndex + end
    
      if startIndex < 0
        startIndex = 0
        respond.beginningReached = yes
    
      if endIndex >= bible.length
        endIndex = bible.length-1
        respond.endReached = yes
      
      # respond 500 if no wrond indexes calculated
      if startIndex >= bible.length or endIndex < 0
        respond500 JSON.stringify
          error: 'Wrong range'
          verse: tv
        return
    
      respond.verses = bible.slice startIndex, endIndex
    
      # mark target verse
      if targetIndex >= startIndex and targetIndex < endIndex
        targetVerse = utils.clone respond.verses[targetIndex - startIndex]
        targetVerse.target = yes
        respond.verses[targetIndex - startIndex] = targetVerse

      # add fake level 3 title (book name)
      v = respond.verses[0] = utils.clone respond.verses[0]
      if not v.titles or v.titles.filter( (t) -> t.level is 3 ).length is 0
        for i in [(startIndex-1)..0]
          if bible[i].titles and (tt = bible[i].titles.filter((t) -> t.level is 3)).length > 0
            title = utils.clone tt[0]
            title.fake = yes
            v.titles or= []
            v.titles.push title
            break
    
      # success response
      respond200 JSON.stringify respond
    
    else
      respond404()

  catch e
    console.log "EXCEPTION: #{e}"
    respond500()
  
).listen parseInt(port, 10)


console.log "BibleApp server running at\n  => http://localhost:#{port}/\nCTRL + C to shutdown"
