export {}

// import React from "react"
// import { Language } from "./languageSelector"
// import Sound from "../public/sound.svg"
// import { getSpeech } from "../library/api/querys"

// interface IWordSpeechProps {
//     language: Language
//     text: string
// }

// const WordSpeech = (): React.ReactElement => {
//     const [loading, setLoading] = React.useState<boolean>(false)
//     const [audio, setAudio] = React.useState<any | null>(null)

//     React.useEffect(() => {
//         setTimeout(() => {
//             setAudio(true)
//         }, 1000)
//     })


//     if (audio) {
//         let context = new AudioContext()
        
//         getSpeech("en", "example")
//             .then(response => {
//                 // context.decodeAudioData(response, buffer => {
//                 //     let source = context.createBufferSource()
//                 //     source.buffer = buffer
//                 //     source.connect(context.destination)
//                 //     source.start()
//                 // })
//                 var sound = new Sound();
//                 sound.loadCompressedDataFromByteArray (response, response.byteLength);
//                 sound.play();
//             })
//             .catch(error => console.log(error))

//     }

//     if (loading) {

//     }

//     // return <Sound onClick={() => {
//     //     setLoading(true)
//     // }}/>

//     return <div></div>
// }

// export default WordSpeech