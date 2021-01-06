import { React, useState } from 'react';
import './stylesheets/PostsPage.css';
import axios from 'axios';
import image from './images/Ninja placeholder.png';
import Post from './Post';

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
            <Post
              title={post.title}
              content={post.content}
            />
          )
        })
      }
    </div>
  )
}