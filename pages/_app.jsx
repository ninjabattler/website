import { useState, useEffect } from 'react';
import Footer from '../components/Footer/Footer';
import LoadingOverlay from '../components/LoadingOverlay/LoadingOverlay';
import NavBar from '../components/Navbar/NavBar';
import '../styles/globals.css';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const [linkClicked, setLinkClicked] = useState(null);
  const router = useRouter();
  
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
