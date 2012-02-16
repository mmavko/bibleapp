http = require("http")
url = require("url")
path = require("path")
fs = require("fs")
exec = require('child_process').exec
stylus = require('stylus')

port = process.argv[2] or 8888


bookKeys = ["gen","ex","lev","num","deut","josh","judg","ruth","1sam","2sam","1kings","2kings","1chron","2chron","ezra","neh","esther","job","ps","prov","eccles","song","is","jer","lam","ezek","dan","hos","joel","amos","obad","jon","mic","nahum","hab","zeph","hag","zech","mal","mt","mk","lk","jn","acts","rom","1cor","2cor","gal","eph","phil","col","1thess","2thess","1tim","2tim","tit","philem","heb","jas","1pet","2pet","1jn","2jn","3jn","jude","rev"]
{books} = JSON.parse fs.readFileSync('source/bible.json', 'utf8')


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
  
  uri = url.parse(request.url).pathname
  
  
  # API
  
  apiRE = /^\/api\//i
  if apiRE.test uri
    [pathname, bookKey, chapter] = uri.match /^\/api\/(.*?)(\d*)$/i
    bookIndex = bookKeys.indexOf bookKey.toLowerCase()
    chapterIndex = parseInt(chapter, 10) - 1
    
    unless bookIndex >= 0 and chapterIndex >= 0
      respond404()
      return
    
    try
      chapter = books[bookIndex].chapters[chapterIndex]
    catch e
      respond404()
      return
    
    unless chapter
      respond404()
      return
    
    if chapterIndex is 0
      chapter.titles = [{
        verse: 0
        level: 2
        text: books[bookIndex].title
      }]
      # chapter.singleChapter = yes if books[bookIndex].chapters.length is 1
    
    respond200 JSON.stringify chapter
    return
  

  # CoffeeScript

  filename = path.join(process.cwd(), uri)
  
  if /\.js$/.test filename
    filenameCS = filename.replace /\.js$/, '.coffee'

    if path.existsSync filenameCS
      exec "coffee -p #{filenameCS}", (error, stdout, stderr) ->
        if error
          respond500 stderr
          return
        
        respond200 stdout
      return
  
  
  # Stylus

  filename = path.join(process.cwd(), uri)
  
  if /\.css$/.test filename
    filenameStyl = filename.replace /\.css$/, '.styl'

  if path.existsSync filenameStyl
    stylusString = fs.readFileSync filenameStyl, 'utf8'
    stylus(stylusString)
      .set('filename', filename)
      .render (error, css) ->
        if error
          respond500 error
          return
        
        respond200 css
    return

  
  # statis files
  
  path.exists filename, (exists) ->
    unless exists
      respond404()
      return
      
    filename += "/index.html" if fs.statSync(filename).isDirectory()
    
    fs.readFile filename, "binary", (err, file) ->
      if err
        respond500 err
        return
      
      respond200 file, "binary"
      return
  
).listen parseInt(port, 10)


console.log "Static file server running at\n  => http://localhost:#{port}/\nCTRL + C to shutdown"
