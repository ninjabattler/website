import { React } from 'react';
import './stylesheets/ArticlesPage.css';
import JsxParser from 'react-jsx-parser';
import Paragraph from './Paragraph';
import Carousel from './Carousel'

export default function ArticlesPage(props) {

  // const [closed, setClosed] = useState(true)
  const testData = [{
    name: 'Test 1',
    image: 'https://files.ninjabattler.ca/image/Cosmic%20Carnage%20Thumbnail.jpg',
    video: 'https://storage.googleapis.com/personal-webiste/Video/CosmicCarnage.mp4',
    date: 'NOW',
    colour: '#FFFF00',
    content: "<Paragraph text='November 22, 1994, SEGA released their newest console, the 32-bit, SEGA Saturn, as the successor of their previous console, the Genesis. It was a great console, ya know, despite being one of the worst consoles ever and arguably the worst mistake SEGA has ever made but hey, it wasn’t all bad right? The Saturn was home to many great games such as Astal, Panzer Dragoon, Virtua Fighter, Fighting Vipers, Burning Rangers, and the topic of this article, NiGHTS into Dreams!' />\n<Paragraph text='November 22, 1994, SEGA released their newest console, the 32-bit, SEGA Saturn, as the successor of their previous console, the Genesis. It was a great console, ya know, despite being one of the worst consoles ever and arguably the worst mistake SEGA has ever made but hey, it wasn’t all bad right? The Saturn was home to many great games such as Astal, Panzer Dragoon, Virtua Fighter, Fighting Vipers, Burning Rangers, and the topic of this article, NiGHTS into Dreams!' />"
  }, {
    name: 'Test 2',
    image: 'https://files.ninjabattler.ca/image/Cosmic%20Carnage%20Thumbnail.jpg',
    video: 'https://storage.googleapis.com/personal-webiste/Video/CosmicCarnage.mp4',
    date: 'NOW',
    colour: '#FFFF00',
    content: "<Paragraph text='November 22, 1994, SEGA released their newest console, the 32-bit, SEGA Saturn, as the successor of their previous console, the Genesis. It was a great console, ya know, despite being one of the worst consoles ever and arguably the worst mistake SEGA has ever made but hey, it wasn’t all bad right? The Saturn was home to many great games such as Astal, Panzer Dragoon, Virtua Fighter, Fighting Vipers, Burning Rangers, and the topic of this article, NiGHTS into Dreams!' />\n<Paragraph text='November 22, 1994, SEGA released their newest console, the 32-bit, SEGA Saturn, as the successor of their previous console, the Genesis. It was a great console, ya know, despite being one of the worst consoles ever and arguably the worst mistake SEGA has ever made but hey, it wasn’t all bad right? The Saturn was home to many great games such as Astal, Panzer Dragoon, Virtua Fighter, Fighting Vipers, Burning Rangers, and the topic of this article, NiGHTS into Dreams!' />"
  }, {
    name: 'Test 3',
    image: 'https://files.ninjabattler.ca/image/Cosmic%20Carnage%20Thumbnail.jpg',
    video: 'https://storage.googleapis.com/personal-webiste/Video/CosmicCarnage.mp4',
    date: 'NOW',
    colour: '#FFFF00',
    content: "<Paragraph text='November 22, 1994, SEGA released their newest console, the 32-bit, SEGA Saturn, as the successor of their previous console, the Genesis. It was a great console, ya know, despite being one of the worst consoles ever and arguably the worst mistake SEGA has ever made but hey, it wasn’t all bad right? The Saturn was home to many great games such as Astal, Panzer Dragoon, Virtua Fighter, Fighting Vipers, Burning Rangers, and the topic of this article, NiGHTS into Dreams!' />\n<Paragraph text='November 22, 1994, SEGA released their newest console, the 32-bit, SEGA Saturn, as the successor of their previous console, the Genesis. It was a great console, ya know, despite being one of the worst consoles ever and arguably the worst mistake SEGA has ever made but hey, it wasn’t all bad right? The Saturn was home to many great games such as Astal, Panzer Dragoon, Virtua Fighter, Fighting Vipers, Burning Rangers, and the topic of this article, NiGHTS into Dreams!' />"
  }, {
    name: 'Test 4',
    image: 'https://files.ninjabattler.ca/image/Cosmic%20Carnage%20Thumbnail.jpg',
    video: 'https://storage.googleapis.com/personal-webiste/Video/CosmicCarnage.mp4',
    date: 'NOW',
    colour: '#FFFF00',
    content: "<Paragraph text='November 22, 1994, SEGA released their newest console, the 32-bit, SEGA Saturn, as the successor of their previous console, the Genesis. It was a great console, ya know, despite being one of the worst consoles ever and arguably the worst mistake SEGA has ever made but hey, it wasn’t all bad right? The Saturn was home to many great games such as Astal, Panzer Dragoon, Virtua Fighter, Fighting Vipers, Burning Rangers, and the topic of this article, NiGHTS into Dreams!' />\n<Paragraph text='November 22, 1994, SEGA released their newest console, the 32-bit, SEGA Saturn, as the successor of their previous console, the Genesis. It was a great console, ya know, despite being one of the worst consoles ever and arguably the worst mistake SEGA has ever made but hey, it wasn’t all bad right? The Saturn was home to many great games such as Astal, Panzer Dragoon, Virtua Fighter, Fighting Vipers, Burning Rangers, and the topic of this article, NiGHTS into Dreams!' />"
  }, {
    name: 'Test 5',
    image: 'https://files.ninjabattler.ca/image/Cosmic%20Carnage%20Thumbnail.jpg',
    video: 'https://storage.googleapis.com/personal-webiste/Video/CosmicCarnage.mp4',
    date: 'NOW',
    colour: '#FFFF00',
    content: "<Paragraph text='November 22, 1994, SEGA released their newest console, the 32-bit, SEGA Saturn, as the successor of their previous console, the Genesis. It was a great console, ya know, despite being one of the worst consoles ever and arguably the worst mistake SEGA has ever made but hey, it wasn’t all bad right? The Saturn was home to many great games such as Astal, Panzer Dragoon, Virtua Fighter, Fighting Vipers, Burning Rangers, and the topic of this article, NiGHTS into Dreams!' />\n<Paragraph text='November 22, 1994, SEGA released their newest console, the 32-bit, SEGA Saturn, as the successor of their previous console, the Genesis. It was a great console, ya know, despite being one of the worst consoles ever and arguably the worst mistake SEGA has ever made but hey, it wasn’t all bad right? The Saturn was home to many great games such as Astal, Panzer Dragoon, Virtua Fighter, Fighting Vipers, Burning Rangers, and the topic of this article, NiGHTS into Dreams!' />"
  }, {
    name: 'Test 6',
    image: 'https://files.ninjabattler.ca/image/Cosmic%20Carnage%20Thumbnail.jpg',
    video: 'https://storage.googleapis.com/personal-webiste/Video/CosmicCarnage.mp4',
    date: 'NOW',
    colour: '#FFFF00',
    content: "<Paragraph text='November 22, 1994, SEGA released their newest console, the 32-bit, SEGA Saturn, as the successor of their previous console, the Genesis. It was a great console, ya know, despite being one of the worst consoles ever and arguably the worst mistake SEGA has ever made but hey, it wasn’t all bad right? The Saturn was home to many great games such as Astal, Panzer Dragoon, Virtua Fighter, Fighting Vipers, Burning Rangers, and the topic of this article, NiGHTS into Dreams!' />\n<Paragraph text='November 22, 1994, SEGA released their newest console, the 32-bit, SEGA Saturn, as the successor of their previous console, the Genesis. It was a great console, ya know, despite being one of the worst consoles ever and arguably the worst mistake SEGA has ever made but hey, it wasn’t all bad right? The Saturn was home to many great games such as Astal, Panzer Dragoon, Virtua Fighter, Fighting Vipers, Burning Rangers, and the topic of this article, NiGHTS into Dreams!' />"
  }, {
    name: 'Test 7',
    image: 'https://files.ninjabattler.ca/image/Cosmic%20Carnage%20Thumbnail.jpg',
    video: 'https://storage.googleapis.com/personal-webiste/Video/CosmicCarnage.mp4',
    date: 'NOW',
    colour: '#FFFF00',
    content: "<Paragraph text='November 22, 1994, SEGA released their newest console, the 32-bit, SEGA Saturn, as the successor of their previous console, the Genesis. It was a great console, ya know, despite being one of the worst consoles ever and arguably the worst mistake SEGA has ever made but hey, it wasn’t all bad right? The Saturn was home to many great games such as Astal, Panzer Dragoon, Virtua Fighter, Fighting Vipers, Burning Rangers, and the topic of this article, NiGHTS into Dreams!' />\n<Paragraph text='November 22, 1994, SEGA released their newest console, the 32-bit, SEGA Saturn, as the successor of their previous console, the Genesis. It was a great console, ya know, despite being one of the worst consoles ever and arguably the worst mistake SEGA has ever made but hey, it wasn’t all bad right? The Saturn was home to many great games such as Astal, Panzer Dragoon, Virtua Fighter, Fighting Vipers, Burning Rangers, and the topic of this article, NiGHTS into Dreams!' />"
  }, {
    name: 'Test 8',
    image: 'https://files.ninjabattler.ca/image/Cosmic%20Carnage%20Thumbnail.jpg',
    video: 'https://storage.googleapis.com/personal-webiste/Video/CosmicCarnage.mp4',
    date: 'NOW',
    colour: '#FFFF00',
    content: "<Paragraph text='November 22, 1994, SEGA released their newest console, the 32-bit, SEGA Saturn, as the successor of their previous console, the Genesis. It was a great console, ya know, despite being one of the worst consoles ever and arguably the worst mistake SEGA has ever made but hey, it wasn’t all bad right? The Saturn was home to many great games such as Astal, Panzer Dragoon, Virtua Fighter, Fighting Vipers, Burning Rangers, and the topic of this article, NiGHTS into Dreams!' />\n<Paragraph text='November 22, 1994, SEGA released their newest console, the 32-bit, SEGA Saturn, as the successor of their previous console, the Genesis. It was a great console, ya know, despite being one of the worst consoles ever and arguably the worst mistake SEGA has ever made but hey, it wasn’t all bad right? The Saturn was home to many great games such as Astal, Panzer Dragoon, Virtua Fighter, Fighting Vipers, Burning Rangers, and the topic of this article, NiGHTS into Dreams!' />"
  }, {
    name: 'Test 9',
    image: 'https://files.ninjabattler.ca/image/Cosmic%20Carnage%20Thumbnail.jpg',
    video: 'https://storage.googleapis.com/personal-webiste/Video/CosmicCarnage.mp4',
    date: 'NOW',
    colour: '#FFFF00',
    content: "<Paragraph text='November 22, 1994, SEGA released their newest console, the 32-bit, SEGA Saturn, as the successor of their previous console, the Genesis. It was a great console, ya know, despite being one of the worst consoles ever and arguably the worst mistake SEGA has ever made but hey, it wasn’t all bad right? The Saturn was home to many great games such as Astal, Panzer Dragoon, Virtua Fighter, Fighting Vipers, Burning Rangers, and the topic of this article, NiGHTS into Dreams!' />\n<Paragraph text='November 22, 1994, SEGA released their newest console, the 32-bit, SEGA Saturn, as the successor of their previous console, the Genesis. It was a great console, ya know, despite being one of the worst consoles ever and arguably the worst mistake SEGA has ever made but hey, it wasn’t all bad right? The Saturn was home to many great games such as Astal, Panzer Dragoon, Virtua Fighter, Fighting Vipers, Burning Rangers, and the topic of this article, NiGHTS into Dreams!' />"
  }, {
    name: 'Test 10',
    image: 'https://files.ninjabattler.ca/image/Cosmic%20Carnage%20Thumbnail.jpg',
    video: 'https://storage.googleapis.com/personal-webiste/Video/CosmicCarnage.mp4',
    date: 'NOW',
    colour: '#FFFF00',
    content: "<Paragraph text='November 22, 1994, SEGA released their newest console, the 32-bit, SEGA Saturn, as the successor of their previous console, the Genesis. It was a great console, ya know, despite being one of the worst consoles ever and arguably the worst mistake SEGA has ever made but hey, it wasn’t all bad right? The Saturn was home to many great games such as Astal, Panzer Dragoon, Virtua Fighter, Fighting Vipers, Burning Rangers, and the topic of this article, NiGHTS into Dreams!' />\n<Paragraph text='November 22, 1994, SEGA released their newest console, the 32-bit, SEGA Saturn, as the successor of their previous console, the Genesis. It was a great console, ya know, despite being one of the worst consoles ever and arguably the worst mistake SEGA has ever made but hey, it wasn’t all bad right? The Saturn was home to many great games such as Astal, Panzer Dragoon, Virtua Fighter, Fighting Vipers, Burning Rangers, and the topic of this article, NiGHTS into Dreams!' />"
  }]

  return (
    <>
      <Carousel />
      <main id='articlesPage'>
        <div className='articlesPageContainer'>
          {testData.slice(0, 4).map((item) => {
            return (
              <section className='articleCard'>
                <article className='articleCardItem'
                  onMouseEnter={(e) => {
                    e.target.parentElement.children["0"].className = 'fade'
                  }}
                  onMouseLeave={(e) => {
                    e.target.parentElement.children["0"].className = 'fadeIn'
                  }}>
                  <div>
                    <img src={item.image} alt='thumbnail' />
                    <video loop muted autoPlay >
                      <source src={item.video} type="video/webm"></source>
                      <source src={item.video} type="video/ogg"></source>
                      <source src={item.video} type="video/mp4"></source>
                    </video>
                    <div> </div>
                    <section>
                      <h1 style={{ filter: `drop-shadow(1px 1px 0px ${item.colour})` }}>{item.name}</h1>
                    </section>
                  </div>

                  <div>
                    <aside>
                      <JsxParser
                        components={{ Paragraph }}

                        jsx={item.content ? item.content.split(/\/n/g).slice(0, 4).join('') : ''}
                      />
                    </aside>
                  </div>
                </article>
              </section>)
          })}
        </div>
      </main>
    </>)
}