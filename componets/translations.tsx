import React from "react"
import { Button } from "react-bootstrap"
import { TranslationResult, getExamples, Translation, Examples, Example } from "../library/api/querys"
import { Languages } from "../pages"

const Translations = (props: {
    translatedWord: TranslationResult
    languages: Languages
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
        if (props.translatedWord) {
            return props.translatedWord.translations.map(translation => {
                return (
                    <Translation 
                        key={props.translatedWord.translations.indexOf(translation)}
                        translation={translation} 
                    />
                )
            })
        }
    }

    const Translation = (translationProps: {
        translation: Translation
    }) => {
        const [examples, setExamples] = React.useState<Example[] | null>(null)

        const TranslationResult = () => {
            return (
                <li key={translationProps.translation.normalizedTarget}>
                    <div>{translationProps.translation.normalizedTarget}</div>
                    
                    <Button onClick={() => {
                        getExamples(
                            props.translatedWord.normalizedSource, 
                            translationProps.translation.normalizedTarget, 
                            props.languages.From, 
                            props.languages.To
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
                return examples.map(example => {
                    return (
                        <li key={examples.indexOf(example)}>
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