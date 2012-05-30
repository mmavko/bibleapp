fs = require("fs")
http = require("http")
url = require("url")

port = process.argv[2] or 8888

books = JSON.parse fs.readFileSync('data/books.json', 'utf8')
bible = JSON.parse fs.readFileSync('data/bible.json', 'utf8')

http.createServer( (request, response) ->
  
  respond404 = ->
    response.writeHead 404, "Content-Type": "text/plain"
    response.write "404 Not Found\n"
    response.end()
  
  respond500 = (err = 'Internal Server Error') ->
    response.writeHead 500, "Content-Type": "text/plain"
    response.write err + "\n"
    response.end()
  
  respond200 = (data, mode) ->
    response.writeHead 200
    response.write data, mode
    response.end()
  
  urlData = url.parse(request.url, yes)
  
  if urlData.pathname is '/api'
    
    respond = {}
    
    {target, start, end} = urlData.query
    matches = target.match /(\d*\s*[^\d]+)(\d+)?[:\s\-]?(.+)?/
    
    # target verse
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
    
    respond.verses = bible.slice startIndex, endIndex
    
    respond200 JSON.stringify respond
    
  else
    respond404()
  
).listen parseInt(port, 10)


console.log "BibleApp server running at\n  => http://localhost:#{port}/\nCTRL + C to shutdown"
