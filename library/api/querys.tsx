import metadata from "../metadata.json"

interface TranslationResult {
    queryResult: QueryResult
    existsInDB: boolean
}

interface QueryResult {
    displaySource: string
    translations: Translation[]
}

interface Translation {
    displayTarget: string
    confidence: number
}

const getNumberOfWords = async (): Promise<number> => {
    let response = await fetch(`${metadata.apiurl}/GetNumberOfWords`)

    return Number(await response.text())
}

const translateWord = async (language: string, word: string): Promise<TranslationResult> => {
    let response = await fetch(`${metadata.apiurl}/TranslateWord?language=${language}&word=${word}`)

    return await response.json()
}

const getRandomWord = async (language: string): Promise<QueryResult> => {
    let response = await fetch(`${metadata.apiurl}/GetRandomWord?language=${language}`)

    return await response.json()
}

export {
    getNumberOfWords,
    translateWord,
    getRandomWord
}

export type {
    TranslationResult,
    QueryResult,
    Translation
}