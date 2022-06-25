import React from "react"
import { Button } from "react-bootstrap"
import { TranslationResult, getExamples, Translation, Examples } from "../library/api/querys"
import { TranslationLanguages } from "./languageSelector"

const Translations = (props: {
    translatedWord: TranslationResult
    languages: TranslationLanguages
}) => {
    const Result = () => {
        if (props.translatedWord) {
            return (
                <ul>
                    {TranslationsList()}
                </ul>
            )
        }
    }

    const TranslationsList = () => {
        if (props.translatedWord.queryResult) {
            return props.translatedWord.queryResult.translations.map(translation => {
                return (
                    <Translation 
                        key={props.translatedWord.queryResult.translations.indexOf(translation)}
                        translation={translation} 
                    />
                )
            })
        }
    }

    const Translation = (translationProps: {
        translation: Translation
    }) => {
        const [examples, setExamples] = React.useState<Examples | null>(null)

        const TranslationResult = () => {
            return (
                <li key={translationProps.translation.normalizedTarget}>
                    <div>{translationProps.translation.normalizedTarget}</div>
                    
                    <Button onClick={() => {
                        getExamples(
                            props.translatedWord.queryResult.normalizedSource, 
                            translationProps.translation.normalizedTarget, 
                            props.languages.from.abbreviation, 
                            props.languages.to.abbreviation
                        )
                            .then(examples => setExamples(examples))
                    }}>Get examples</Button>
    
                    <Examples />
                </li>
            )
        }

        const Examples = () => {
            const ExamplesResult = () => {
                if (examples) {
                    return (
                        <ul>
                            {ExamplesList()}
                        </ul>
                    )
                }
            }

            const ExamplesList = () => {
                return examples.examples.map(example => {
                    return (
                        <li key={examples.examples.indexOf(example)}>
                            <div>{example.targetPrefix}{example.targetTerm}{example.targetSuffix}</div>
                            <div>{example.sourcePrefix}{example.sourceTerm}{example.sourceSuffix}</div>
                        </li>
                    )
                })
            }

            return ExamplesResult()
        }

        return TranslationResult()
    }

    return Result()
}

export default Translations