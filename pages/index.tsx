import type { NextPage } from 'next'
import Head from 'next/head'
import { Form, Button } from 'react-bootstrap'
import React from 'react'
import {
    translateWord,
    getNumberOfWords,
    TranslationResult,
    addWord,
    NumberOfWords,
    deleteWord
} from '../library/api/querys'
import NavbarComponent from '../componets/navbar'
import LanguageSelector, {
    languages,
    TranslationLanguages
} from '../componets/languageSelector'
import Translations from '../componets/translations'
import WordActions from '../componets/wordActions'


const Home: NextPage = () => {
    const [searchedWord, setSearchedWord] = React.useState<string>("")
    const [translatedWord, setTranslatedWord] = React.useState<TranslationResult | null>(null)
    const [numberOfWords, setNumberOfWords] = React.useState<NumberOfWords | null>(null)
    const [translationLanguages, setTranslationLanguages] = React.useState<TranslationLanguages>({ from: languages.Spanish, to: languages.English })

    const translateInput = React.useRef<HTMLInputElement | null>()
    const focusInput = () => translateInput.current.focus()

    React.useEffect(() => {
        getNumberOfWords()
            .then(result => {
                setNumberOfWords(result)
            })

        focusInput()
    }, [])

    const translateWordCallback = async (): Promise<void> => {
        let result = await translateWord(translationLanguages.from.abbreviation, searchedWord)

        setTranslatedWord(result)
    }

    const NumberOfWordsElement = () => {
        if (numberOfWords) {
            return (
                <div style={localStyles.numberOfWords}>
                    {numberOfWords.es} different words have been translated to english and {numberOfWords.en} to spanish!
                </div>
            )
        }
    }

    const TranslatedWordElement = () => {
        if (translatedWord) {
            return (
                <div>
                    <div>The posible translations are:</div>

                    <ul>
                        <Translations
                            translatedWord={translatedWord}
                            languages={translationLanguages}
                        />
                    </ul>

                    {
                        translatedWord.existsInDB == true ?
                            <div>
                                <div>This word has already been searched</div>

                                <Button variant="danger" onClick={() => {
                                    deleteWord(translationLanguages.from.abbreviation, searchedWord)
                                        .then(() => {
                                            let newNumberOfWords = numberOfWords
                                            newNumberOfWords[translationLanguages.from.abbreviation as keyof NumberOfWords] = newNumberOfWords[translationLanguages.from.abbreviation as keyof NumberOfWords] - 1

                                            setNumberOfWords({
                                                es: newNumberOfWords.es,
                                                en: newNumberOfWords.en
                                            })
                                        })
                                }}>Delete word</Button>
                            </div>
                            :
                            <Button onClick={() => {
                                addWord(translationLanguages.from.abbreviation, searchedWord)
                                    .then(() => {
                                        let newNumberOfWords = numberOfWords
                                        newNumberOfWords[translationLanguages.from.abbreviation as keyof NumberOfWords] = newNumberOfWords[translationLanguages.from.abbreviation as keyof NumberOfWords] + 1

                                        setNumberOfWords({
                                            es: newNumberOfWords.es,
                                            en: newNumberOfWords.en
                                        })
                                    })
                            }}>Add word</Button>
                    }
                </div>
            )
        }
    }

    return (
        <>
            <Head>
                <title>Translate</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/translation.png" />
            </Head>

            <NavbarComponent />

            <main style={localStyles.mainElement}>
            
                <NumberOfWordsElement />

                <LanguageSelector
                    setLanguages={setTranslationLanguages}
                    focusInput={focusInput}
                />

                <Form
                    onSubmit={
                        (ev: any)  => {
                            ev.preventDefault()
                            translateWordCallback()
                        }
                    }
                    style={localStyles.form}
                >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            type="text"
                            placeholder={translationLanguages.from.translatePlaceholder}
                            value={searchedWord}
                            ref={translateInput}
                            onChange={(ev: any) => setSearchedWord(ev.target.value.toLowerCase())}
                            autoComplete="off"
                            autoFocus
                        />
                    </Form.Group>

                    <WordActions word={translatedWord} />

                    <Button variant="primary" type="submit" style={localStyles.translateButton}>Translate</Button>
                    
                    <Button variant="primary" type="button" onClick={() => {
                        setSearchedWord("")
                        setTranslatedWord(null)
                        focusInput()
                    }}>Clear</Button>

                    <TranslatedWordElement />
                </Form>
            </main>
        </>
    )
}

export default Home

const localStyles = {
    numberOfWords: {
        marginBottom: "10px"
    },

    mainElement: {
        marginTop: "20px",
        paddingLeft: "20px",
        paddingRight: "20px"
    },

    translateButton: {
        marginRight: "10px"
    },

    form: {
        marginTop: "10px"
    }
}


