import React from "react"
import { Form } from 'react-bootstrap'

interface TranslationLanguages {
    from: Language,
    to: Language
}

const languages: {[key: string] : Language} = {
    Spanish: {
        abbreviation: "es",
        name: "spanish",
        translatePlaceholder: "Introduzca la palabra a traducir"
    },

    English: {
        abbreviation: "en",
        name: "english",
        translatePlaceholder: "Translate word"
    }
}

interface Language {
    abbreviation: string,
    name: string,
    translatePlaceholder: string
}

const LanguageSelector = (props: {
    setLanguages: (languages: TranslationLanguages) => void,
    focusInput: () => void
}): React.ReactElement => {
    return (
        <>
            <Form.Check
                inline
                label="spanish"
                name="originLanguage"
                type="radio"
                onClick={() => {
                    props.setLanguages({from: languages.Spanish, to: languages.English})
                    props.focusInput()
                }}
                defaultChecked
            />

            <Form.Check
                inline
                label="english"
                name="originLanguage"
                type="radio"
                onClick={() => {
                    props.setLanguages({from: languages.English, to: languages.Spanish})
                    props.focusInput()
                }}
            />
        </>
    )
}

export default LanguageSelector

export {
    languages
}

export type {
    Language,
    TranslationLanguages
}