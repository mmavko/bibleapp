
fs = require('fs')

bible = fs.readFileSync("../old/bible.json").toString()

bible = JSON.parse bible

books = []
bible.books.map (book, i) ->
  nc = number_cath = i+1
  if number_cath >= 45 and number_cath <= 58
    nc = number_cath + 7
  if number_cath >= 59 and number_cath <= 65
    nc = number_cath - 14
  books.push
    n: i+1
    nc: nc
    t: book.title
    c: book.chapters.length

console.log JSON.stringify books