import { React, useState } from 'react';
import './stylesheets/PostsPage.css';
import axios from 'axios';
import image from './images/Ninja placeholder.png'

export default function PostsPage(props){

  const [posts, setPosts] = useState(false)
  
  if(!posts){
    axios.get('http://localhost:5000/posts')
    .then((res) => {
      setPosts(res.data.rows)
    })
  }

  console.log(posts)

  return (
    <div id='postsPage'>
      {!posts ? 
        (<></>)
        :
        posts.map((post)=>{
          return (
          <article>
            <div className='left'>
              <h1>
                {post.title}
              </h1>
            </div>
            <div className='right'>
              <img src={image}/>
            </div>
          </article>)
        })
      }
    </div>
  )
}