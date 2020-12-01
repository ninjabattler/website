import './App.css';
import Paragraph from './components/Paragraph';
import TitleCard from './components/TitleCard';
import VideoHeader from './components/VideoHeader'

function App() {
  const pageColour = '#5740FB'

  return (
    <div className="App">
      <header className="App-header">
        <VideoHeader 
          pageColour={pageColour}
          title='Cosmic Carnage - 32X'
        />
        <article className='articleContainer' style={{boxShadow: `5px 5px 0px ${pageColour}`}}>
          <Paragraph
            text='AYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYy'
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
