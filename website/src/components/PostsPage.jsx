import { React, useState } from 'react';
import './stylesheets/PostsPage.css';
import axios from 'axios';
// import image from './images/Ninja placeholder.png';
import Post from './Post';
import PostShadow from './PostShadow';

export default function PostsPage(props){

  const [posts, setPosts] = useState(false)
  const [empty, setEmpty] = useState(false)

  const emptyPosts = [];
  
  if(!posts){
    axios.get('http://localhost:5000/posts')
    .then((res) => {
      setPosts(res.data.rows)

      for(let i = 0; i < 9 - res.data.rows.length; i++ ) {
        emptyPosts.push((<PostShadow/>))
      }

      setEmpty(emptyPosts)
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
      {empty}
    </div>
  )
}