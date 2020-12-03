import './App.css';
import Paragraph from './components/Paragraph';
import TitleCard from './components/TitleCard';
import VideoHeader from './components/VideoHeader';
import InfoBar from './components/InfoBar';
import Navbar from './components/NavBar';
import Picture from './components/Picture';
import ListItem from './components/ListItem';
import Underline from './components/Underline';
import Quote from './components/Quote';
import image from './components/images/Cosmic Carnage title.png';

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
          <Underline/>
          <Quote
            quote='Game zooms in for an in-your-face view of hand-to-hand carnage!'
            source='Cosmic Carnage game box'
          />
          <TitleCard 
            pageColour={pageColour}
            title='Slow-mo Fatality'
          />
          <Paragraph
            text={`Now we should start this by adressing the most important part of all fighting games, the fighters. Would you
                  really remember Mortal Kombat as fondly if it didn't have memorable characters like Scorpion, Sonya, Ermac, Shao 
                  Kahn etc? Excatly, so this game needs to have great characters to. Characters in ths game are split into 2 groups, 
                  space police(?) who wear armor that can be swapped between light and heavy, and some guys who escaped from a 
                  prison and are responsible for the self destruct sequence being activated. The police's armor affects their
                  movement speed, jump height and their special attacks however, the armor can break and when a piece breaks,
                  you loose the special attack associated with it. However the villians have no armor and thus can keep their moves,
                  but are slower than police with light armor and weaker than heavy armor. Lets start this off by talking about 
                  the police characters.`}
          />
          <ul>
            <ListItem
              pageColour={pageColour}
              imgSrc='https://segaretro.org/images/2/2b/CosmicCarnage_32X_Cylic_Portrait.png'
              content={(<div><h3>Cylic</h3><p>An alien warrior who excedes at keeping his distance with haduken like projectiles or long metal arms</p></div>)}
            />
            <ListItem
              pageColour={pageColour}
              imgSrc='https://segaretro.org/images/7/73/CosmicCarnage_32X_Tyr-Karl_Portrait.png'
              content={(<div><h3>Tyr</h3><p>A creator of armor and weaponry with the ablity to avoid projectiles and create pillars of fire by smashing the ground</p></div>)}
            />
            <ListItem
              pageColour={pageColour}
              imgSrc='https://segaretro.org/images/0/07/CosmicCarnage_32X_Naruto_Portrait_US-EU.png'
              content={(<div><h3>Naruto</h3><p>Yes he's a ninja. Naruto can dash away from his opponents and has a multitude of long range and aerial attacks, and yes he has a katana</p></div>)}
            />
            <ListItem
              pageColour={pageColour}
              imgSrc='https://segaretro.org/images/9/99/CosmicCarnage_32X_ZenaLan_Portrait.png'
              content={(<div><h3>Zena Lan</h3><p>Speed is Zena's specialty, that and electrifying her opponents with projectiles or upward shocks that are sure to know airborn opponents out of the sky</p></div>)}
            />
          </ul>
        </article>
      </header>
    </div>
  );
}

export default App;
