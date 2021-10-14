import { React, useState, useEffect } from 'react';
import './stylesheets/PostsPage.css';
import axios from 'axios';
// import image from './images/Ninja placeholder.png';
import Post from './Post';
import ReviewPost from './ReviewPost';
import PostShadow from './PostShadow';
import { Helmet } from "react-helmet";
let ip;
let userId

export default function PostsPage(props) {

  const [posts, setPosts] = useState(false)
  const [empty, setEmpty] = useState(false)

  const emptyPosts = [];

  useEffect(async () => {
    ip = await axios({ method: 'get', url: `https://api.ipify.org?format=json`, headers: { 'Content-Type': 'application/json' }, })
    ip = ip.data.ip;

    await axios({ method: 'post', url: `/users/userId`, params: { ip: ip }, headers: { 'Content-Type': 'application/json' }, })
      .catch((res) => {
        userId = res.data.userId
      })
      .catch((err) => {
        console.log(err)
        userId = { data: { userId: null } }
      })

    if (!posts) {
      axios.get('/postData')
        .then((res) => {
          setPosts(res.data.rows)

          for (let i = 0; i < 1 - res.data.rows.length; i++) {
            emptyPosts.push((<PostShadow />))
          }

          setEmpty(emptyPosts)
        })
    }
  }, [])

  console.log(posts)

  return (
    <div id='postsPage'>
      <Helmet>
        <title>Ninjabattler - Posts</title>
      </Helmet>
      {!posts ?
        (<></>)
        :
        posts.map((post) => {
          return !post.review ? (
            <Post
              title={post.title}
              content={post.content}
              date={post.date}
              id={post.id}
              ip={ip}
              userId={userId}
              comments={post.comments}
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