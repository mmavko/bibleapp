fs = require("fs")

bible = JSON.parse fs.readFileSync('bible.json', 'utf8')
bookKeys = ["gen","ex","lev","num","deut","josh","judg","ruth","1sam","2sam","1kings","2kings","1chron","2chron","ezra","neh","esther","job","ps","prov","eccles","song","is","jer","lam","ezek","dan","hos","joel","amos","obad","jon","mic","nahum","hab","zeph","hag","zech","mal","mt","mk","lk","jn","acts","rom","1cor","2cor","gal","eph","phil","col","1thess","2thess","1tim","2tim","tit","philem","heb","jas","1pet","2pet","1jn","2jn","3jn","jude","rev"]


# count lengths

stats = []

maxLength = 0
minLength = Number.MAX_VALUE
totalLength = 0

numChapters = 0

for book, i in bible.books
  lengths = []
  numChapters += book.chapters.length
  for chapter in book.chapters
    chapterText = ''
    for verse in chapter.verses
      verse = verse.text if verse.text
      chapterText += verse
    length = chapterText.length
    lengths.push length
    maxLength = length if length > maxLength
    minLength = length if length < minLength
    totalLength += chapterText.length
  stats.push
    key: bookKeys[i]
    lengths: lengths


# count stats

avrLength = Math.round(totalLength / numChapters)
avrPercent = 100 / numChapters

_squares = []
for book in stats
  for chLen in book.lengths
    diff = avrLength-chLen
    _squares.push diff*diff

stdevLength = 0
stdevLength += square for square in _squares
stdevLength = Math.round Math.sqrt(stdevLength/_squares.length)
stdevPercent = stdevLength / totalLength * 100


# count percents

maxPercent = 0
minPercent = 100
totalPercent = 0

for book in stats
  book.percents = []
  for chLen in book.lengths
    percent = chLen / totalLength * 100
    book.percents.push percent
    maxPercent = percent if percent > maxPercent
    minPercent = percent if percent < minPercent
    totalPercent += percent


# log results

console.log "numChapters is: #{numChapters}\n"
console.log "maxLength was: #{maxLength}"
console.log "minLength was: #{minLength}"
console.log "avrLength is: #{avrLength}"
console.log "stdevLength is: #{stdevLength}"
console.log "totalLength is: #{totalLength}\n"
console.log "maxPercent was: #{maxPercent}"
console.log "minPercent was: #{minPercent}"
console.log "avrPercent is: #{avrPercent}"
console.log "stdevPercent is: #{stdevPercent}"
console.log "totalPercent is: #{totalPercent}\n"


# log JSON

for book in stats
  for percent, i in book.percents
    book.percents[i] = Math.round(percent*100000) / 100000
  delete book.lengths
# console.log JSON.stringify stats

