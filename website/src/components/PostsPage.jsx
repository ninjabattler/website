import { React, useState, useEffect } from 'react';
import './stylesheets/PostsPage.css';
import axios from 'axios';
// import image from './images/Ninja placeholder.png';
import Post from './Post';
import ReviewPost from './ReviewPost';
import PostShadow from './PostShadow';

export default function PostsPage(props) {

  const [posts, setPosts] = useState(false)
  const [empty, setEmpty] = useState(false)

  const emptyPosts = [];

  useEffect(() => {
    if (!posts) {
      axios.get('/postData')
        .then((res) => {
          setPosts(res.data.rows)

          for (let i = 0; i < 9 - res.data.rows.length; i++) {
            emptyPosts.push((<PostShadow />))
          }

          setEmpty(emptyPosts)
        })
    }
  }, [])

  console.log(posts)

  return (
    <div id='postsPage'>
      {!posts ?
        (<></>)
        :
        posts.map((post) => {
          return !post.review ? (
            <Post
              title={post.title}
              content={post.content}
              date={post.formatteddate}
            />
          )
            :
            (<ReviewPost
              title={post.title}
              content={post.content}
              thumbnail={post.thumbnail}
              colour={post.colour}
              date={post.formatteddate}
            />)
        })
      }
      {empty}
    </div>
  )
}