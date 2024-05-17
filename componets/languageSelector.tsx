import React from "react"
import { Form } from 'react-bootstrap'
import { Languages } from "../pages"
import { LanguageCodes } from "../Domain/Enums/LanguageCodes"

// interface TranslationLanguages {
//     from: Language,
//     to: Language
// }

// const languages: {[key: string] : Language} = {
//     Spanish: {
//         abbreviation: "es",
//         name: "spanish",
//         translatePlaceholder: "Introduzca la palabra a traducir"
//     },

//     English: {
//         abbreviation: "en",
//         name: "english",
//         translatePlaceholder: "Translate word"
//     }
// }

// interface Language {
//     abbreviation: string,
//     name: string,
//     translatePlaceholder: string
// }

const LanguageSelector = (props: {
    setLanguages: (languages: Languages) => void,
    focusInput: () => void
}): React.ReactElement => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row'}}>
            <div style={{ marginRight: '10px'}}>Translate from</div>

            <Form.Check
                inline
                label="spanish"
                name="originLanguage"
                type="radio"
                onClick={() => {
                    props.setLanguages({
                        From: LanguageCodes.SpanishSpain, 
                        To: LanguageCodes.EnglishUS
                    })
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
                    props.setLanguages({
                        From: LanguageCodes.EnglishUS, 
                        To: LanguageCodes.SpanishSpain
                    })
                    props.focusInput()
                }}
            />
        </ div>
    )
}

export default LanguageSelector

// export {
//     languages
// }

// export type {
//     Language,
//     TranslationLanguages
// }