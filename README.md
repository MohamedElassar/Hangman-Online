# Hangman-Online
https://mohamedelassar.github.io/hangman-online/

To get started, simply click on the link above and have fun playing Hangman!

## How it works:
1)    A random word is selected from [this](https://raw.githubusercontent.com/matthewreagan/WebstersEnglishDictionary/master/dictionary_compact.json) JSON file of Webster's Unabridged English Dictionary (credit to the [Gutenberg Project](https://www.gutenberg.org/ebooks/29765))
2)    The user is then informed of the length of the word at question, and the number of blank dashes on the screen will reflect that
3)    You will always start with 9 attempts
4)    To make a guess, use your mouse click on the character from the alphabet the you believe is included in the word
5)    Keep playing until you either correctly guess the word or run out of attempts
6)    As you play, parts of Hangman are drawn whenever you make an incorrect guess
7)    At the end of the round, the definition of the word will be displayed. The definition is obtained from the same JSON file as the random word
8)    An mp3 file will be displayed with the correct pronounciation of the word. When available, this is obtained throgh the [Merriam-Webster API](https://www.dictionaryapi.com/products/api-collegiate-dictionary)
9)    To play another round, simply click the button at the bottom of the screen!
