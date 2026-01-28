import React, { useContext, useState } from 'react'
import ai1 from '../assets/chatbot-logo-icon1.png'
import { ShopDataContext } from '../context/ShopDataContext'
import { useNavigate } from 'react-router-dom'
import open from '../assets/open.mp3'

function Ai() {
    const {showSeacrh, setShowSearch} = useContext(ShopDataContext)
    const navigate = useNavigate()
    const [activeAi, setActiveAi] = useState(false)

    const openingSound = new Audio(open)

    function speak(message) {
        const utterance = new SpeechSynthesisUtterance(message)
        window.speechSynthesis.speak(utterance)
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()

    recognition.onresult = (event) => {
        const transcripts = event.results[0][0].transcript.trim().toLowerCase()

        if (transcripts.includes("search") && transcripts.includes("open") && !showSeacrh){
            setShowSearch(true)
            speak("Opening Search")
            navigate('/collection')
            setActiveAi(false)
        } 
        else if (transcripts.includes("search") && transcripts.includes("close") && showSeacrh){
            setShowSearch(false)
            speak("Closing Search")
            setActiveAi(false)
        } 
        else if (transcripts.includes("collection") || transcripts.includes("product")){
            speak("Opening Collections page")
            navigate('/collection')
            setActiveAi(false)
        } 
        else if (transcripts.includes("about")){
            speak("Opening About page")
            navigate('/about')
            setShowSearch(false)
            setActiveAi(false)
        } 
        else if (transcripts.includes("home")){
            speak("Opening Home page")
            navigate('/')
            setShowSearch(false)
            setActiveAi(false)
        } 
        else if (transcripts.includes("contact")){
            speak("Opening Contact page")
            navigate('/contact')
            setShowSearch(false)
            setActiveAi(false)
        } 
        else if (transcripts.includes("cart")){
            speak("Opening your Cart")
            navigate('/cart')
            setShowSearch(false)
            setActiveAi(false)
        } 
        else if (transcripts.includes("order") || transcripts.includes("orders")){
            speak("Opening your Orders page")
            navigate('/order')
            setShowSearch(false)
            setActiveAi(false)
        }
        else {
            speak("Sorry, I did not understand that command.")
            setActiveAi(false)
        }

        recognition.onend = () => setActiveAi(false)
        recognition.onerror = () => setActiveAi(false)
    }

    return (
        <div 
            className='fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%]' 
            onClick={() => {
                recognition.start()
                openingSound.play()
                setActiveAi(true)
            }}
        >
            <img 
                src={ai1} 
                alt="" 
                className={`w-[100px] cursor-pointer ${activeAi ? 'translate-x-[10%] translate-y-[10%] scale-125' :
                'translate-x-[0] translate-y-[0] scale-100'} transition-transform`}
                style={{filter: activeAi ? 'drop-shadow(0px 0px 30px #00d2fc)' : 'drop-shadow(0px 0px 20px black)'}}
            />
        </div>
    )
}

export default Ai
