import logo from './logo.svg';
import './App.css';
import TitleCard from './components/TitleCard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TitleCard 
          pageColour='#00FFFF'
          imageSrc='https://static.wikia.nocookie.net/terraria/images/f/f2/NPC_636.gif/revision/latest/scale-to-width-down/386?cb=20200618223104'
          title='Empress of Light'
        />
      </header>
    </div>
  );
}

export default App;
