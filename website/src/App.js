import './App.css';
// import Paragraph from './components/Paragraph';
// import TitleCard from './components/TitleCard';
// import VideoHeader from './components/VideoHeader';
// import InfoBar from './components/InfoBar';
import Navbar from './components/NavBar';
import SideBar from './components/SideBar';
// import Picture from './components/Picture';
// import ListItem from './components/ListItem';
// import Underline from './components/Underline';
// import Quote from './components/Quote';
// import image from './components/images/Cosmic Carnage title.png';
import Footer from './components/Footer';
import HomePage from './components/HomePage'
import PostsPage from './components/PostsPage'
import ArticlesPage from './components/ArticlesPage'
import ReviewPage from './components/ReviewPage'
import About from './components/About'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

function App() {
  // const pageColour = '#0055FF'

  return (
    <div className="App">
      <Navbar
        pageColour={'null'}
      />
      <SideBar />
      <header className="App-header">
        <BrowserRouter>
          <Switch>
            <Route exact path='/'>
              <HomePage/>
            </Route>
            <Route path='/about'>
              <About/>
            </Route>
            <Route path='/posts/:review'>
              <ReviewPage/>
            </Route>
            <Route path='/posts'>
              <PostsPage/>
            </Route>
            <Route path='/articles'>
              <ArticlesPage/>
            </Route>
          </Switch>
        </BrowserRouter>
        <Footer/>
      </header>
  
    </div>
  );
}

export default App;
