import { getHeapCodeStatistics } from "v8"
import metadata from "../metadata.json"

interface TranslationResult {
    queryResult: Translations
    existsInDB: boolean
}

interface Translations {
    normalizedSource: string
    displaySource: string
    translations: Translation[]
}

interface Translation {
    normalizedTarget: string
    displayTarget: string
    confidence: number
}

interface NumberOfWords {
    es: number, 
    en: number
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

const getNumberOfWords = async (): Promise<NumberOfWords> => {
    let response = await fetch(`${metadata.apiurl}/GetNumberOfWords`)

    return await response.json()
}

const translateWord = async (
    fromLanguageAbbreviation: string, 
    word: string
): Promise<TranslationResult> => {
    let response = await fetch(`${metadata.apiurl}/TranslateWord?language=${fromLanguageAbbreviation}&word=${word}`)

    return await response.json()
}

const getRandomWord = async (language: string): Promise<TranslationResult> => {
    let response = await fetch(`${metadata.apiurl}/GetRandomWord?language=${language}`)

    return {
        queryResult: await response.json(),
        existsInDB: true
    }
}

const addWord = async (languageAbbreviation: string, word: string): Promise<void> => {
    await fetch(`${metadata.apiurl}/AddWord?language=${languageAbbreviation}&word=${word}`)
}

const getExamples = async (text: string, translation: string, from: string, to: string): Promise<Examples> => {
    let response = await fetch(`${metadata.apiurl}/GetExamples?text=${text}&translation=${translation}&from=${from}&to=${to}`)

    return await response.json()
}

const deleteWord = async (languageAbbreviation: string, word: string): Promise<void> => {
    await fetch(`${metadata.apiurl}/DeleteWord?language=${languageAbbreviation}&word=${word}`)
}

const getSpeech = async (languageAbbreviation: string, word: string): Promise<ArrayBuffer> => {
    let response = await fetch(`${metadata.apiurl}/GetSpeech?language=${languageAbbreviation}&word=${word}`)

    let text = await response.text()

    console.log(text)

    const utf8Encode = new TextEncoder()

    return utf8Encode.encode(text).buffer
}

export {
    getNumberOfWords,
    translateWord,
    getRandomWord,
    addWord,
    getExamples,
    deleteWord,
    getSpeech
}

export type {
    TranslationResult,
    Translations,
    Translation,
    NumberOfWords,
    Examples,
    Example
}