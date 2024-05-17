import metadata from "../metadata.json"

interface Word {
    id: string,
    name: string,
    languageCode: string
}

interface TranslationResult {
    normalizedSource: string
    displaySource: string
    translations: Translation[]
    wordExists: boolean
    wordGuid: string
}

interface Translation {
    normalizedTarget: string
    displayTarget: string
    confidence: number
}

interface NumberOfWords {
    languageCode: string, 
    count: number
}

interface Examples {
    normalizedSource: string,
    normalizedTarget: string,
    examples: Example[]
}

interface Example {
    sourcePrefix: string,
    sourceTerm: string,
    sourceSuffix: string,
    targetPrefix: string,
    targetTerm: string,
    targetSuffix: string
}

interface TextTranslation {
    text: string,
    to: string
}

interface TextTranslationDto {
    translations: TextTranslation[],
    existInDb: boolean,
    quoteId: string | null
}

const getNumberOfWords = async (): Promise<NumberOfWords[]> => {
    let response = await fetch(`${metadata.apiurl}/Words/Count`)

    return await response.json()
}

const translateWord = async (
    from: string, 
    to: string,
    word: string
): Promise<TranslationResult> => {
    let response = await fetch(`${metadata.apiurl}/Translator/Overlook?word=${word}&from=${from}&to=${to}`)

    return await response.json()
}

const translateText = async(
    text: string,
    from: string,
    to: string
): Promise<TextTranslationDto> => {
    let response = await fetch(`${metadata.apiurl}/Translator/Translate?text=${text}&from=${from}&to=${to}`)

    return await response.json()
}

const getRandomWord = async (): Promise<Word> => {
    let response = await fetch(`${metadata.apiurl}/Words/Random`)
    var result = await response.json() as Word

    return result;
}

const addWord = async (languageCode: string, name: string): Promise<void> => {
    var body = {
        Name: name,
        LanguageCode: languageCode
    }

    await fetch(`${metadata.apiurl}/Words`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const addQuote = async (languageCode: string, text: string): Promise<void> => {
    var body = {
        Text: text,
        LanguageCode: languageCode
    }

    await fetch(`${metadata.apiurl}/Quotes`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

const getExamples = async (text: string, translation: string, from: string, to: string): Promise<Example[]> => {
    let response = await fetch(`${metadata.apiurl}/Translator/Examples?word=${text}&translation=${translation}&from=${from}&to=${to}`)

    return await response.json()
}

const deleteWord = async (guid: string): Promise<void> => {
    await fetch(`${metadata.apiurl}/Words/${guid}`, {
        method: 'DELETE'
    })
}

const deleteQuote = async (guid: string): Promise<void> => {
    await fetch(`${metadata.apiurl}/QuoteS/${guid}`, {
        method: 'DELETE'
    })
}

// const getSpeech = async (languageAbbreviation: string, word: string): Promise<ArrayBuffer> => {
//     let response = await fetch(`${metadata.apiurl}/GetSpeech?language=${languageAbbreviation}&word=${word}`)

//     let text = await response.text()

//     console.log(text)

//     const utf8Encode = new TextEncoder()

//     return utf8Encode.encode(text).buffer
// }

export {
    getNumberOfWords,
    translateWord,
    getRandomWord,
    addWord,
    getExamples,
    deleteWord,
    translateText,
    deleteQuote,
    addQuote
    // getSpeech
}

export type {
    TranslationResult,
    // Translations,
    Translation,
    NumberOfWords,
    Examples,
    Example,
    TextTranslation,
    TextTranslationDto
}