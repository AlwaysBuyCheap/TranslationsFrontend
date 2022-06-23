import React from "react"
import { Form } from 'react-bootstrap'

enum Languages {
    Spanish = "es",
    English = "en"
}

const LanguageSelector = (props: {
    setLanguage: (language: Languages) => void,
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
                    props.setLanguage(Languages.Spanish)
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
                    props.setLanguage(Languages.English)
                    props.focusInput()
                }}
            />
        </>
    )
}

export default LanguageSelector

export {
    Languages
}