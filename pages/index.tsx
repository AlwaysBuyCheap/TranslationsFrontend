import type { NextPage } from 'next'
import Head from 'next/head'
import { Form, Button } from 'react-bootstrap'
import React from 'react'
import { 
    translateWord, 
    getNumberOfWords, 
    TranslationResult, 
    addWord 
} from '../library/api/querys'
import NavbarComponent from '../componets/navbar'

const Home: NextPage = () => {
	const [searchedWord, setSearchedWord] = React.useState<string>("")
	const [translatedWord, setTranslatedWord] = React.useState<TranslationResult | null>(null)
    const [numberOfWords, setNumberOfWords] = React.useState<number | null>(null)

    const translateInput = React.useRef<HTMLInputElement | null>()

    React.useEffect(() => {
        getNumberOfWords()
            .then(number => setNumberOfWords(number))
    }, [])

	const translateWordCallback = async (): Promise<void> => {
		let result = await translateWord("es", searchedWord)

		setTranslatedWord(result)
	}

    const NumberOfWordsElement = () => {
        return numberOfWords ?
            <div style={localStyles.numberOfWords}>{numberOfWords} different words have been translated!</div>
            :
            null
    }

    const Translations = () => {
        if (translatedWord) {
            return translatedWord.queryResult.translations.map(translation => {
                return <li key={translation.displayTarget}>{translation.displayTarget}</li>
            })
        }
    }

	const TranslatedWordElement = () => {
		return translatedWord ?
			<div>
                <div>The posible translations are:</div>
                <ul>
                    {Translations()}
                </ul>
                
                {
                    translatedWord.existsInDB == true ?
                        <div>This word has already been searched</div>
                        :
                        <Button onClick={() => {
                            addWord("es", searchedWord)
                                .then(() => setNumberOfWords(numberOfWords + 1))
                        }}>Add word</Button>
                }
            </div>
			:
			null
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

				<Form onSubmit={
                    ev => {
                        ev.preventDefault()
                        translateWordCallback()
                    } 
                }>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Control 
							type="text" 
							placeholder="Translate word" 
							value={searchedWord}
                            ref={translateInput}
							onChange={ev => setSearchedWord(ev.target.value)}
                            autoComplete="off"
							autoFocus
						/>
					</Form.Group>

					<Button variant="primary" type="submit" style={localStyles.translateButton}>Translate</Button>
                    <Button variant="primary" type="button" onClick={() => {
                        setSearchedWord("")
                        setTranslatedWord(null)
                        translateInput.current.focus()
                    }}>Clear</Button>

					<TranslatedWordElement />
				</Form>
			</main>
		</>
	)
}

const localStyles = {
    numberOfWords: {
        'marginBottom': "20px"
    },

    mainElement: {
        marginTop: "20px",
        paddingLeft: "20px",
        paddingRight: "20px"
    },

    translateButton: {
        marginRight: "10px"
    }
}

export default Home
