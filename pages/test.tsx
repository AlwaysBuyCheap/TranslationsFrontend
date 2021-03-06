import React from "react"
import Head from 'next/head'
import { NextPage } from "next"
import { getRandomWord, TranslationResult, deleteWord } from '../library/api/querys'
import { Form, Button } from 'react-bootstrap'
import NavbarComponent from "../componets/navbar"
import LanguageSelector, { languages, TranslationLanguages } from '../componets/languageSelector'
import Translations from "../componets/translations"
import { Alert } from "@mui/material"

const Test: NextPage = () => {
    const [randomWord, setRandomWord] = React.useState<TranslationResult | null>(null)
    const [answer, setAnswer] = React.useState<string>("")
    const [solved, setSolved] = React.useState<boolean>(false)
    const [translationLanguages, setTRanslationLanguages] = React.useState<TranslationLanguages>({
        from: languages.Spanish,
        to: languages.English
    })

    const translateInput = React.useRef<HTMLInputElement | null>()
    const focusInput = () => translateInput.current.focus()

    React.useEffect(() => {
        getNewWord()
    }, [translationLanguages])

    const Solution = () => {
        if (solved && randomWord) {
            return (
                <div style={localStyles.solution}>
                    {
                    checkIfAnswerIsCorrect() ?
                        <Alert severity="success">Congratulations your answer is correct!</Alert>
                        :
                        <Alert severity="error">Your answer is wrong, the correct translations are:</Alert>
                    }
    
                    <ul>
                        <Translations
                            translatedWord={randomWord}
                            languages={translationLanguages}
                        />
                    </ul>
    
                    <Button variant="danger" onClick={() => {
                        deleteWord(translationLanguages.from.abbreviation, randomWord.queryResult.normalizedSource)
                    }}>Delete word</Button>
                </div>
            )
        }
    }

    const checkIfAnswerIsCorrect = (): boolean => {
        for (const translation of randomWord?.queryResult.translations) {
            if (translation.normalizedTarget == answer) {
                return true
            }
        }

        return false
    }

    const getNewWord = () => {
        getRandomWord(translationLanguages.from.abbreviation)
            .then(result => {
                setRandomWord(result)
                setSolved(false)
                setAnswer("")

                focusInput()
            })
    }

    return (
        <>
            <Head>
                <title>Words test</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/translation.png" />
            </Head>

            <NavbarComponent />

            <main style={localStyles.mainElement}>
                <LanguageSelector
                    setLanguages={setTRanslationLanguages}
                    focusInput={focusInput}
                />

                <div style={localStyles.question}>
                    How is {randomWord?.queryResult.normalizedSource} spelled in {translationLanguages.from.name}?
                </div>

                <Form onSubmit={
                    ev => {
                        ev.preventDefault()
                        setSolved(true)
                    }
                }>
                    <Form.Control
                        type="text"
                        placeholder="Guess word"
                        value={answer}
                        ref={translateInput}
                        onChange={ev => setAnswer(ev.target.value.toLowerCase())}
                        autoComplete="off"
                        autoFocus
                    />

                    <Solution />

                    <div style={localStyles.buttons}>
                        <Button
                            variant="primary"
                            type="submit"
                            style={localStyles.checkAnswerButton}
                        >Check answer</Button>

                        <Button
                            variant="primary"
                            type="button"
                            onClick={getNewWord}
                        >Get new word</Button>
                    </div>
                </Form>
            </main>
        </>
    )
}

export default Test

const localStyles = {
    checkAnswerButton: {
        marginRight: "20px"
    },

    buttons: {
        marginTop: "10px"
    },

    mainElement: {
        marginTop: "20px",
        paddingLeft: "20px",
        paddingRight: "20px"
    },

    question: {
        marginTop: "10px",
        marginBottom: "10px"
    },

    solution: {
        marginTop: "10px"
    }
}

