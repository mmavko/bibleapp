fs = require('fs')

bible_source = JSON.parse fs.readFileSync("./bible.bibleonline.ru.json", 'utf8')
books = JSON.parse fs.readFileSync("../books.json", 'utf8')

book_ids = (book_id for book_id of books)

bible = []
current_book = null
for chapter in bible_source

  if chapter.book.n is current_book
    ch++
  else
    ch = 1
  current_book = chapter.book.n

  for verse_text, i in chapter.verses

    verse =
      b: book_ids[current_book-1]
      c: ch
      v: i+1
      t: verse_text

    titles = []
    if verse.b is 'gen' and verse.c is 1 and verse.v is 1
      titles.push
        level: 1
        t: 'БІБЛІЯ <span>український переклад проф. І. Огієнка</span>'
    if verse.b is 'gen' and verse.c is 1 and verse.v is 1
      titles.push
        level: 2
        t: 'СТАРИЙ ЗАПОВІТ'
    if verse.b is 'matt' and verse.c is 1 and verse.v is 1
      titles.push
        level: 2
        t: 'НОВИЙ ЗАПОВІТ <span>нашого Господа і спасителя Ісуса Христа</span>'
    if verse.c is 1 and verse.v is 1
      titles.push
        level: 3
        t: books[verse.b].ua_full
    verse.titles = titles if titles.length > 0

    bible.push verse

fs.writeFileSync './bible.json', JSON.stringify bible