import { React, useState, useEffect } from 'react';
import './stylesheets/HomePage.css'
import CodeBlock from './CodeBlock';
import robot from './images/Website robot.png'
// import AudioPlayer from './AudioPlayer'

const QUOTES = [
  'Welcome Chrome User'
]
const SUB_QUOTES = [
  'I hope'
]

let i = 0

export default function HomePage(props) {
  const quoteIndex = Math.floor(Math.random() * QUOTES.length)
  const chosenQuote = QUOTES[quoteIndex]
  const chosenSubQuote = SUB_QUOTES[quoteIndex]

  let [displayedQuote, setDisplayedQuote] = useState('|')
  let [displayedSubQuote, setDisplayedSubQuote] = useState('|')


  useEffect(() => {
    const startQuoteAnim = setTimeout(() => {

      const quoteAnim = setInterval(interval, 100)

      function interval() {
        setDisplayedQuote(chosenQuote.slice(0, i) + '|')
        setDisplayedSubQuote(chosenSubQuote.slice(0, i) + '|')
        i++


        if (i >= chosenQuote.length) {
          setDisplayedQuote(chosenQuote)
          setDisplayedSubQuote(chosenSubQuote)
          clearInterval(quoteAnim)
        }
      }

    }, 800)
  }, [])

  return (
    <div id='homePage'>

      <div id='homePageBackground'></div>

      <div id='homePageContainer'>
        <h1>{displayedQuote}</h1>
        <h4>{displayedSubQuote}</h4>
      </div>

      <p>Welcome to the land of uneducated opinions and a few shades of gray! Browsing this place, you will find incredible opinions on:</p>

      {/* Video game */}
      <div className='homePageInfoDiv'>
        <video autoPlay muted loop>
          <source src='http://files.ninjabattler.ca/video/chaotix.mp4' type="video/mp4"></source>
        </video>
        <p>I've invented the idea of writing words on my opinions on video games! Copyright 2021, do not steal.</p>
      </div>

      {/* Programming */}
      <div className='homePageInfoDiv'>
        <p>I write code! Mayhaps I will write an article on the code I've written every now and then!</p>
        <CodeBlock code={`const Imap = require('imap');\nrequire('dotenv').config();\nconst imap = new Imap({\n  port: 993,\n  host: 'imap.gmail.com',\n  user: process.env.EMAIL,\n  password: process.env.PASSWORD,\n  tls: true\n});\nimap.once('ready', () => {\n  console.log('Imap is ready to hack Nasa');\n  imap.end();\n})\nimap.once('error', (err) => {\n  console.log(err);\n})\nimap.once('end', (err) => {\n  console.log('There is no Nasa');\n})\nimap.connect();`} language='js'/>
      </div>

      {/* Stuff */}
      <div className='homePageInfoDiv'>
        <video autoPlay muted loop>
          <source src='http://storage.googleapis.com/personal-webiste/Video/0000-1200.mp4' type="video/mp4"></source>
        </video>
        <p>And whatever else I feel like writing about, any and all criticism is encouraged! The comments exist for a reason!</p>
      </div>
      <img id='homePageRobot' src={robot} />
      {/* <AudioPlayer title='Nights and Reala' pageColour='#FFFF00' src='https://vgmsite.com/soundtracks/nights-into-dreams-full-selection/nrivivhx/14%20-%20%28reala%29%20%28nights%20%26%20reala%29.mp3' /> */}

    </div>
  )
}