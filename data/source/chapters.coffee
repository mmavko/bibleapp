
fs = require('fs')

books = JSON.parse fs.readFileSync("./books.json", 'utf8')

chapters = []
for book in books
  for c in [1..book.c]
    chapters.push
      book: book
      chapter: "#{if book.nc < 10 then '0' else ''}#{book.nc}/#{if c < 10 then '0' else ''}#{c}"

fs.writeFileSync './chapters.json', JSON.stringify chapters