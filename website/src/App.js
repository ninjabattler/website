import logo from './logo.svg';
import './App.css';
import Paragraph from './components/Paragraph';
import TitleCard from './components/TitleCard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <article className='articleContainer'>
          <Paragraph
            text='AYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYy'
          />
          <TitleCard 
            pageColour='#FF4444'
            imageSrc='https://static.wikia.nocookie.net/sonic/images/d/d4/Blackdoom_pose0_flatten.png/revision/latest/scale-to-width-down/1000?cb=20150410191238'
            title='Black Doom'
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
