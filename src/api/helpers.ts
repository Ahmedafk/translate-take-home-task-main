import axios from "axios";
import { TranslatedWord } from "../models";

const LIBRE_TRANSLATION_URL = "http://127.0.0.1:5000";

export function allCharsValid(word: string): boolean {
    const regEx = /^[A-Za-z]+$/

    return regEx.test(word)
}

export async function requestTranslation(word: string, targetLanguage: string, sourceLanguage = "en"): Promise<TranslatedWord> {
    if (!word) throw new Error("Translator: Missing word to translate")
    if (!targetLanguage) throw new Error("Translator: Missing targetLanguage")

    // Request translation using LibreTranslate library (https://github.com/LibreTranslate/LibreTranslate)
    const response = await axios.post(LIBRE_TRANSLATION_URL + "/translate", {
        q: word,
        source: sourceLanguage,
        target: targetLanguage,
        format: "text",
        api_key: ""
    }, {
        headers: { "Content-Type": "application/json" }
    })

    // Format translated data before returning it
    return { originalWord: word, translatedWord: response.data?.translatedText }
}