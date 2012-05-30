
fs = require('fs')
http = require('http')
jsdom = require('jsdom')
require('buffertools')

jquery = fs.readFileSync("./jquery-1.7.2.min.js").toString()

FILE_NAME = "./bible.bibleonline.ru.json"

chapters = JSON.parse fs.readFileSync(FILE_NAME).toString()

fetch = (chapter, callback) ->
  
  path = "/bible/ukr/#{chapter}/"
  console.log "fetching #{path}"

  url_options = 
    host: 'pda.bibleonline.ru'
    path: path
    headers:
      'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.46 Safari/536.5'

  request = http.get url_options, (res) ->
    html = null
    res.on 'data', (chunk) ->
      html = if html then html.concat chunk else chunk
    res.on 'end', ->
      jsdom.env
        html: html.toString()
        src: [jquery]
        done: (errors, window) ->
          $ = window.$
          $('span.v span.n').remove()
          $('span.v br').remove()
          verses = []
          $('span.v').each -> verses.push $(this).html()
          callback verses
          # for verse in verses
          #   console.log " - #{verse}"

i = 0
current_chapter = null
cmon = (verses) ->
  if current_chapter and verses
    current_chapter.verses = verses
    fs.writeFileSync FILE_NAME, JSON.stringify chapters

  return if i>= chapters.length
  current_chapter = chapters[i]
  i++
  
  if current_chapter.verses
    cmon()
  else
    fetch current_chapter.chapter, cmon
cmon()


