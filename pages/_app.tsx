import { useState, useEffect } from 'react';
import Footer from '../components/Footer/Footer';
import LoadingOverlay from '../components/LoadingOverlay/LoadingOverlay';
import NavBar from '../components/Navbar/NavBar';
import '../styles/globals.scss';
import { NextRouter, useRouter } from 'next/router';
import { AppProps } from 'next/app';
import quotes from '../constants/loadingOverlayQuotes.json';
import 'highlight.js/styles/vs2015.css'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

function MyApp({ Component, pageProps }: AppProps) {
  const [linkClicked, setLinkClicked] = useState<string | null>(null);
  const [quoteIndex, setQuoteIndex] = useState<number>(Math.floor(Math.random() * quotes.length));
  const router: NextRouter = useRouter();
  gsap.registerPlugin(ScrollTrigger)
  
  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      setLinkClicked('')
    })
  }, [])

  useEffect(() => {
    if (linkClicked) {
      
      setQuoteIndex(Math.floor(Math.random() * quotes.length));
      setTimeout(() => {
        router.push(linkClicked);
      }, 1200)

    } else if (linkClicked === '') {

      setTimeout(() => {
        setLinkClicked(null);
      }, 1200)

    }
  }, [linkClicked])

  return (
    <>
      <NavBar setLinkClicked={setLinkClicked} />
      {linkClicked && <LoadingOverlay quoteIndex={quoteIndex} />}
      {linkClicked === '' && <LoadingOverlay shrink quoteIndex={quoteIndex} />}
      <Component {...pageProps} setLinkClicked={setLinkClicked} />
      <Footer />
    </>
  )
}

export default MyApp
