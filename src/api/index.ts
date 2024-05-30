import express from 'express';
import { TranslateRequestBody } from '../models';
import { allCharsValid, requestTranslation } from './helpers';
const SpellChecker = require('spellchecker');
const isWord = require('is-word');
const englishWords = isWord('british-english');
const app = express();

const PORT = 3000;

app.use(express.json())

// This endpoint is utilised by "wait-on" package to ensure this service is running
app.get('/', async (req, res) => {
  res.send("endpoint exists");
})

app.post('/translate', async (req, res) => {
  const body: TranslateRequestBody = req.body
  const words = body.words
  const targetLanguage = body.targetLanguage

  try {
    // Validate request body format matches "TranslateRequestBody" interface
    if (!body) throw new Error("request body not found")
    if (!targetLanguage) throw new Error("target language not found")
    if (!(words?.length > 0)) throw new Error("words to translate not found")

    let safeWordsSet = new Set<string>()
    for (let i = 0; i < words?.length; i++) {
      const word = words[i];

      // For the current word being iterated, ensure:
      //   1. All character are valid (using regular expressions)
      //   2. Word is correctly spelt (using "SpellChecker" package)
      //   3. Word is in english (using "is-word" package)
      // Discard any words that do not meet these requirements
      const isSanitised: boolean = allCharsValid(word) && !SpellChecker.isMisspelled(word) && englishWords.check(word)

      // Utilise <Set> to avoid duplications
      isSanitised && safeWordsSet.add(word)
    }

    const processedWords = await Promise.all([...safeWordsSet].map(word => requestTranslation(word, targetLanguage)))
    res.send({ words: processedWords, targetLanguage });
  } catch (error) {
    console.log('error', error)
    res.status(500).send({ error: 'Failed to fetch translations: ' + error })
  }
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
