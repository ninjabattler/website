import { React, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/ReviewPage.css';
import axios from 'axios';
import VideoHeader from './VideoHeader';
import InfoBar from './InfoBar';
import { useParams } from 'react-router-dom';
import JsxParser from 'react-jsx-parser';
import Picture from './Picture';
import ListItem from './ListItem';
import Underline from './Underline';
import Quote from './Quote';
import Paragraph from './Paragraph';
import TitleCard from './TitleCard';
import ParticlesBg from 'particles-bg';
import Comment from './Comment';
import ninjabattler from './images/Ninja placeholder.png'

let ip;
let isLiked = false;
let isDisliked = false;
let commentContent = '';
let userId;
let postId;

let QUOTES = [
  'Ware wa meshia nari!',
  "Falcon... I'm not the only copy of you.",
  'This is like taking candy from a baby, which is fine by me',
  "I am the Eggman, that's what I am, I am the Eggman, I've got the master plan",
  'Zero! You were a Maverick?!',
  'Poyo!',
  'You mean... Craymen?!',
  'Impending doom aproaches',
  "But that's what it takes to be infinite!",
  "You there, you're the one they call Dragonborn?",
  "What a fool you are. I'm a god, how can you kill a god? What a grand and intoxicating innocence. How could you be so naive? There is no escape. No recall or intervention can work in this place. Come, lay down your weapons, it is not too late for my mercy",
  "Woomy!",
  "You're dead, your friends are dead, game over"
]

//Grabs the data of an article based off it's title
const getArticleData = async (params, cb) => {
  try {
    ip = await axios({ method: 'get', url: `https://api.ipify.org?format=json`, headers: { 'Content-Type': 'application/json' }, })
    ip = ip.data.ip;

    const res = await axios({ method: 'get', url: `/postData/${params.review}/`, headers: { 'Content-Type': 'application/json' }, })
    const comments = await axios({ method: 'get', url: `/postData/comments/`, params: { postId: res.data.rows[0].id }, headers: { 'Content-Type': 'application/json' }, })
    const liked = await axios({ method: 'get', url: `/users/liked/`, params: { ip, postId: res.data.rows[0].id }, headers: { 'Content-Type': 'application/json' } })
    userId = liked.data.userId
    postId = res.data.rows[0].id;

    if (liked.data.liked !== undefined) {
      liked.data.liked.liked === true ? isLiked = true : isDisliked = true;
    }
    console.log(comments.data.rows)
    const data = res.data.rows[0];
    cb(
      data.title,
      data.colour,
      data.content,
      data.formatteddate,
      `${data.category} / ${data.genre}`,
      data.likes,
      data.dislikes,
      data.id,
      data.video_header,
      comments.data.rows)
  }
  catch (err) {
    console.log(err);
  }
}

//Create a new like and a new user if they don't alreaday exist
const like = async (params, cb) => {
  try {
    const res = await axios({ method: 'get', url: `/users/like`, params: { ip, like: params.like, postId: params.id }, headers: { 'Content-Type': 'application/json' }, })
    cb()
  }
  catch (err) {
    console.log(err);
  }
}

const comment = async (params, setCommenting, cb) => {
  try {
    setCommenting(true)
    const res = await axios({ method: 'post', url: `/users/comment`, params: { ip, content: params.content, postId: params.id }, headers: { 'Content-Type': 'application/json' }, })
    const comments = await axios({ method: 'get', url: `/postData/comments/`, params: { postId: postId }, headers: { 'Content-Type': 'application/json' }, })

    console.log(res)
    setCommenting(false)
    cb(comments.data.rows)
  }
  catch (err) {
    console.log(err);
  }
}

export default function PostsPage(props) {
  const page = this

  const [title, setTitle] = useState('')
  const [colour, setColour] = useState('')
  const [content, setContent] = useState('')
  const [date, setDate] = useState('')
  const [categoryGenre, setCategoryGenre] = useState('')
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [id, setId] = useState(0)
  const [video, setVideo] = useState('')
  const [comments, setComments] = useState([])
  const [commenting, setCommenting] = useState(false)

  const params = useParams();

  useEffect(() => {
    getArticleData(params, (name, colour, content, date, cg, likes, dislikes, id, video, comments) => {
      setTitle(name);
      setColour(colour);
      setContent(content);
      setDate(date);
      setCategoryGenre(cg);
      setLikes(Number(likes));
      setDislikes(Number(dislikes));
      setId(id);
      setVideo(video)
      setComments(comments)
    })
  }, [])

  return (
    <div id='reviewPage'>
      {video !== '' ?
        (<VideoHeader
          pageColour={colour}
          title={title}
          video={video}
        />)
        :
        (<></>)}
      {content !== '' ?
        (<InfoBar
          date={date}
          categoryGenre={categoryGenre}
        />)
        :
        (<></>)
      }
      <div>
        {content !== '' ?
          (<>
            <article className='articleContainer' style={{ boxShadow: `5px 5px 0px ${colour}` }}>
              <JsxParser
                components={{ Picture, ListItem, Underline, Quote, Paragraph, TitleCard }}

                jsx={content}
              />
            </article>
            <aside className='commentPanel'>
              <aside className='likePanel' >

                <button onClick={() => {
                  like({ like: true, id, }, () => {
                    isLiked = !isLiked
                    if (isLiked === true) {
                      setLikes(likes + 1)
                    } else {
                      setLikes(likes - 1)
                    }
                    if (isDisliked) {
                      isDisliked = !isDisliked
                      setDislikes(dislikes - 1)
                    }
                    console.log(isLiked, isDisliked)
                  })
                }}
                  style={{ color: isLiked === true ? colour : 'rgb(35, 35, 35)' }}>
                  <i class="far fa-thumbs-up">{likes}</i>

                </button>

                <div id='likeBar' style={{ backgroundImage: `linear-gradient(90deg, ${colour} ${Math.round(likes / (likes + dislikes)) * 100}%, transparent ${Math.round(likes / (likes + dislikes)) * 100}%)` }}>

                </div>

                <button onClick={() => {
                  like({ like: false, id, }, () => {
                    isDisliked = !isDisliked
                    if (isDisliked === true) {
                      setDislikes(dislikes + 1)
                    } else {
                      setDislikes(dislikes - 1)
                    }
                    if (isLiked) {
                      isLiked = !isLiked
                      setLikes(likes - 1)
                    }
                    console.log(isLiked, isDisliked)
                  })
                }}
                  style={{ color: isDisliked === true ? colour : 'rgb(35, 35, 35)' }}>
                  <i class="far fa-thumbs-down">{dislikes}</i>
                </button>
              </aside>

              {commenting === true ?
                (<>
                  <p id='commentLoading'>
                    <img src={ninjabattler} />
                  </p>
                </>) :
                (<>
                  <textarea
                    id='commentArea'
                    name="comment"
                    placeholder="Leave a comment!"
                    onChange={(e) => {
                      commentContent = e.target.value
                    }}
                    onFocus={(e) => {
                      e.target.placeholder = ''
                    }}
                    onBlur={(e) => {
                      e.target.placeholder = 'Leave a comment!'
                    }}>
                  </textarea>
                  <button onClick={() => {
                    comment({ content: commentContent, id: id }, setCommenting, (newComments) => {
                      commentContent = ''
                      setComments(newComments)
                    })
                  }}>
                    <i class="fas fa-caret-square-right"></i>
                  </button>
                </>)}

              <div className='comments'>
                {comments.map((com) => {
                  console.log(com)
                  return (<Comment
                    pageColour={com.user_id === userId ? colour : 'transparent'}
                    username={com.username.slice(0, 10)}
                    date={com.formatteddate}
                    content={com.content}
                    avatar={com.avatar} />)
                })}
              </div>
            </aside>
          </>)
          :
          (<div id="loadingArticle">
            <img src={ninjabattler} />
            <h3>"{QUOTES[Math.floor(Math.random() * QUOTES.length)]}"</h3>
          </div>)}
      </div>
      <aside className='commentPanel mobile'>
        <aside className='likePanel' >

          <button onClick={() => {
            like({ like: true, id, }, () => {
              isLiked = !isLiked
              if (isLiked === true) {
                setLikes(likes + 1)
              } else {
                setLikes(likes - 1)
              }
              if (isDisliked) {
                isDisliked = !isDisliked
                setDislikes(dislikes - 1)
              }
              console.log(isLiked, isDisliked)
            })
          }}
            style={{ color: isLiked === true ? colour : 'rgb(35, 35, 35)' }}>
            <i class="far fa-thumbs-up">{likes}</i>

          </button>

          <div id='likeBar' style={{ backgroundImage: `linear-gradient(90deg, ${colour} ${Math.round(likes / (likes + dislikes)) * 100}%, transparent ${Math.round(likes / (likes + dislikes)) * 100}%)` }}>

          </div>

          <button onClick={() => {
            like({ like: false, id, }, () => {
              isDisliked = !isDisliked
              if (isDisliked === true) {
                setDislikes(dislikes + 1)
              } else {
                setDislikes(dislikes - 1)
              }
              if (isLiked) {
                isLiked = !isLiked
                setLikes(likes - 1)
              }
              console.log(isLiked, isDisliked)
            })
          }}
            style={{ color: isDisliked === true ? colour : 'rgb(35, 35, 35)' }}>
            <i class="far fa-thumbs-down">{dislikes}</i>
          </button>
        </aside>

        {commenting === true ?
          (<>
            <p id='commentLoading'>
              <img src={ninjabattler} />
            </p>
          </>) :
          (<>
            <textarea
              id='commentArea'
              name="comment"
              placeholder="Leave a comment!"
              onChange={(e) => {
                commentContent = e.target.value
              }}
              onFocus={(e) => {
                e.target.placeholder = ''
              }}
              onBlur={(e) => {
                e.target.placeholder = 'Leave a comment!'
              }}>
            </textarea>
            <button onClick={() => {
              comment({ content: commentContent, id: id }, setCommenting, (newComments) => {
                commentContent = ''
                setComments(newComments)
              })
            }}>
              <i class="fas fa-caret-square-right"></i>
            </button>
          </>)}

        <div className='comments'>
          {comments.map((com) => {
            console.log(com)
            return (<Comment
              pageColour={com.user_id === userId ? colour : 'transparent'}
              username={com.username.slice(0, 10)}
              date={com.formatteddate}
              content={com.content}
              avatar={com.avatar} />)
          })}
        </div>
      </aside>
    </div>
  )
}