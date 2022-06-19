import metadata from "../metadata.json"

interface Result {
    englishWord: string,
    spanishWord: string,
    existsInDB: boolean
}

const getNumberOfWords = async (): Promise<number> => {
    let response = await fetch(`${metadata.apiurl}/GetNumberOfWords`)

    return Number(await response.text())
}

const addWord = async (englishWord: string, spanishWord: string): Promise<void> => {
    await fetch(`${metadata.apiurl}/AddWord?englishWord=${englishWord}&spanishWord=${spanishWord}`)
}

const getSpanishWord = async (englishWord: string): Promise<Result> => {
    let response = await fetch(`${metadata.apiurl}/GetSpanishWord?englishWord=${englishWord}`)

    return await response.json()
}

const getEnglishWord = async (spanishWord: string): Promise<Result> => {
    let response = await fetch(`${metadata.apiurl}/GetEnglishWord?spanishWord=${spanishWord}`)

    return await response.json()
}

const getRandomWord = async (): Promise<Result> => {
    let response = await fetch(`${metadata.apiurl}/GetRandomWord?`)

    let json = await response.json()

    return {
        spanishWord: json.item1,
        englishWord: json.item2,
        existsInDB: true
    }
}

export {
    getNumberOfWords,
    addWord,
    getSpanishWord,
    getEnglishWord,
    getRandomWord
}

export type {
    Result
}