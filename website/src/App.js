import './App.css';
import Paragraph from './components/Paragraph';
import TitleCard from './components/TitleCard';
import VideoHeader from './components/VideoHeader';
import InfoBar from './components/InfoBar';
import Navbar from './components/NavBar';
import Picture from './components/Picture';
import image from './components/images/Cosmic Carnage title.png'

function App() {
  const pageColour = '#0055FF'

  return (
    <div className="App">
      <Navbar
        pageColour={pageColour}
      />
      <header className="App-header">
        <VideoHeader 
          pageColour={pageColour}
          title='Cosmic Carnage - 32X'
        />
        <InfoBar/>
        <article className='articleContainer' style={{boxShadow: `5px 5px 0px ${pageColour}`}}>
          <Paragraph
            text={`November 21, 1994, Sega realeases their ill fated 32X console, an addon for the 16 bit Sega Genesis created to
                  extend it's lifespan before the Saturn released. Only a handful of games were available at launch including
                  a deluxe of Sega's hit 3D arcade racer, Virtua Racing, a shitty port of Doom with terrible audio quality and
                  many missing levels, and one original game which is the topic of this article, Cosmic Carnage. A traditional
                  2D fighter in the same vein as Mortal Kombat or Street Fighter 2, taking place on a self destructing ship with
                  only one escape pod. Taking a look at screenshots, this game looks pretty cool, but when you take a second to 
                  actually play it, you'll realise you're playing a slower, clunkier Mortal Kombat in space with worse fatalities.
                  What do I mean by this, read onward and you will see, this is Cosmic Carnage for Sega Genesis 32x!`}
          />
          <Picture
            pageColour={pageColour}
            imageSrc={image}
          />
          <TitleCard 
            pageColour={pageColour}
            title='Slow-mo Fatality'
          />
          <Paragraph
            text='AYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYy'
          />
        </article>
      </header>
    </div>
  );
}

export default App;
