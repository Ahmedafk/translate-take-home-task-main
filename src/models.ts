export interface TranslateRequestBody {
    words: string[];
    targetLanguage: string;
}

export interface TranslateResponseBody {
    words: TranslatedWord[];
    targetLanguage: string;
}

export interface TranslatedWord {
    originalWord: string;
    translatedWord: string;
}