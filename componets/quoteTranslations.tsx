import React from "react"
import { TextTranslation, TextTranslationDto } from "../library/api/querys"

const QuoteTranslations = (props: {
    translation: TextTranslationDto
}) => {
    const Result = () => {
        if (props.translation){
            return (
                <ul>
                    <Translations />
                </ul>
            )
        }
    }

    const Translations = () => {
        if (props.translation){
            var result = props.translation.translations.map((translation, index) => <Translation key={index} translation={translation} />)

            return <>{result}</>
        }

        return null
    }

    const Translation = ({
        translation
    }: {
        translation: TextTranslation
    }) => (
        <li>
            <div>{translation.text}</div>
        </li>
    )

    return Result()
}

export default QuoteTranslations