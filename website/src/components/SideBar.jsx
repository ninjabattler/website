import { React, useState } from 'react';
import "./stylesheets/SideBar.css";
import image from './images/Banner.png'

export default function SideBar(props) {

  const [drop, setDrop] = useState(false)

  return (
    <div className='sideBar'>
      <button id='sideBarTag' style={{ marginLeft: drop ? '35vw' : '0' }} onClick={() => { setDrop(!drop) }}>{'>'}</button>
      {
        drop ?
          (<><aside id='cover'></aside>
            <main id='panel'>
              <div className='option'>
                <h1><a href='/'>Home</a></h1>
              </div>
              <div className='option'>
                <h1><a href='/posts'>Posts</a></h1>
              </div>
              <div className='option'>
                <h1><a href='/articles'>Articles</a></h1>
              </div>
              <div className='option'>
                <h1><a href='/about'>About</a></h1>
              </div>
              <ul></ul>
              <div className='option'>
                <h1><a href='https://www.linkedin.com/in/jayden-tucker-52a5711ba/'>Linkedin</a></h1>
              </div>
              <div className='option'>
                <h1><a href='https://github.com/ninjabattler'>Github</a></h1>
              </div>
            </main></>)
          :
          (<></>)
      }
    </div>
  )
}