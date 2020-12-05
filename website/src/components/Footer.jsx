import React from 'react';
import "./stylesheets/Footer.css";

export default function Footer(props){
  return (
    <footer className='footer'>
      <div className='linkDisplay'>
      <a href='https://github.com/ninjabattler'>
        <div><i class="fab fa-github"></i>https://github.com/ninjabattler</div>
      </a>
      <a>
        <div><i class="fab fa-linkedin"></i>https://www.linkedin.com/in/jayden-tucker-52a5711ba/</div>
      </a>
      </div>
    </footer>
  )
}