import { useState, useEffect } from 'react';
import Footer from '../components/Footer/Footer';
import LoadingOverlay from '../components/LoadingOverlay/LoadingOverlay';
import NavBar from '../components/Navbar/NavBar';
import '../styles/globals.scss';
import { NextRouter, useRouter } from 'next/router';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const [linkClicked, setLinkClicked] = useState<string | null>(null);
  const router: NextRouter = useRouter();
  
  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      setLinkClicked('')
    })
  }, [])

  useEffect(() => {
    if (linkClicked) {

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
      {linkClicked && <LoadingOverlay />}
      {linkClicked === '' && <LoadingOverlay shrink />}
      <Component {...pageProps} setLinkClicked={setLinkClicked} />
      <Footer />
    </>
  )
}

export default MyApp