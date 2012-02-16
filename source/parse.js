fs = require('fs');

function forEachLine(text, cb) {
  function getNextLine(text, startPos) {
    var endPos = text.indexOf('%0D%0A', startPos);
    return text.substring(startPos, endPos);
  }

  var startPos = 0;
  text = escape(text);
  while (line = getNextLine(text, startPos)) {
    cb(unescape(line));
    startPos += line.length + 6;
    if (startPos >= text.length) {
      break;
    }
  }
}

function strip(str) {
  return str.replace(/^\s+/, '').replace(/\s+$/, '');
}

text = fs.readFileSync('bible.html', 'utf8');
total = 0;
unrecognized = 0;

books = [];
currentBook = null;
currentBookTitle = '';
currentChapter = null;

forEachLine(text, function (line) {
  switch (true) {
    // if heading
    case line.indexOf('<H1>') >= 0:
      matches = line.match(/\<H1\>(.*)\s(.*)\<\/H1\>/);
      title = matches[1];
      // store chapter
      if (currentBook && currentChapter) {
        currentBook.chapters.push(currentChapter);
      }
      currentChapter = {
        verses: []
      };
      // if new book
      if (title !== currentBookTitle) {
        if (currentBook) {
          books.push(currentBook);
        }
        currentBook = {
          title: currentBookTitle = title,
          chapters: []
        };
      }
      break;
    // if verse
    case line.indexOf('<SUP>') >= 0:
      matches = line.match(/\<SUP\>.*\<\/SUP\> (.*)\<BR\>/);
      verseText = matches[1];
      // if commentary
      if (matches = verseText.match(/\<I\>(.*)\<\/I\>/)) {
        verse = {
          commentary: true,
          text: strip(matches[1])
        }
      }
      else {
        verse = strip(verseText);
      }
      currentChapter.verses.push(verse);
      break;
    // else
    default:
      unrecognized++;
  }
  total++;
});

// store last chapter and last book
currentBook.chapters.push(currentChapter);
books.push(currentBook);


bible = {
  translation: 'Український переклад проф. І. Огієнка',
  copyright: 'Українське біблійне товариство, 1962',
  books: books
};

fs.writeFileSync('bible.json', JSON.stringify(bible));
console.log('bible.json written.');
console.log(total + " total lines read.");
console.log(unrecognized + " lines unrecognized.");
