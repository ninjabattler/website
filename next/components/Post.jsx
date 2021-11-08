import { React, useState, useEffect } from 'react';
// import styles from '../styles/Post.module.css';
import FireText from './animatedText/FireText';
import IceText from './animatedText/IceText';
import ThunderText from './animatedText/ThunderText';
import EarthText from './animatedText/EarthText';
import JsxParser from 'react-jsx-parser';
// import Comment from './Comment';
// import ninjabattler from './images/'
import axios from 'axios';

export default function Posts(props) {


  const today = new Date();

  const secondsSincePost = ((today.getTime() / 1000) - (new Date(props.date.replace(' ', 'T')).getTime() / 1000))
  let minutesSincePost
  let hoursSincePost
  let daysSincePost
  let weeksSincePost
  let monthsSincePost
  let yearsSincePost

  if (secondsSincePost > 60) {
    minutesSincePost = secondsSincePost / 60
  }
  if (minutesSincePost > 60) {
    hoursSincePost = minutesSincePost / 60
  }
  if (hoursSincePost > 24) {
    daysSincePost = hoursSincePost / 24
  }
  if (daysSincePost > 7) {
    weeksSincePost = daysSincePost / 7
  }
  if (weeksSincePost > 4) {
    monthsSincePost = weeksSincePost / 4
  }
  if (monthsSincePost > 12) {
    yearsSincePost = monthsSincePost / 12
  }

  const [closed, setClosed] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState(props.comments || [])
  const [commenting, setCommenting] = useState(false)
  let commentContent = '';

  const comment = async (params, setCommenting, cb) => {
    try {
      setCommenting(true)
      const res = await axios({ method: 'post', url: `/users/comment`, params: { ip: params.ip, content: params.content, postId: params.id }, headers: { 'Content-Type': 'application/json' }, })
      const comments = await axios({ method: 'get', url: `/postData/comments/`, params: { postId: params.id }, headers: { 'Content-Type': 'application/json' }, })

      // console.log(res)
      setCommenting(false)
      cb(comments.data.rows)
    }
    catch (err) {
      console.log(err);
    }
  }


  return (
    <article key={props.title} className={`${closed === 0 ? 'post' : closed === 1 ? 'expanded' : 'post closed'}`} style={{ backgroundImage: '/Ninja placeholder.png' }} onClick={() => {
      setClosed(closed === 0 || closed === 2 ? 1 : 2)
      setShowComments(false)
      setTimeout(() => {
        setShowContent(!showContent)
      }, 700)
    }}>
      {
        !showContent ?
          (<img src={'/Ninja placeholder.png'} />)
          :
          (<></>)
      }

      <h1>{props.title}</h1>

      {/* Date */}
      {
        !showContent ?
          (<>{
            yearsSincePost ?
              (<h2>{Math.round(yearsSincePost)} Years</h2>)
              :
              monthsSincePost ?
                (<h2>{Math.round(monthsSincePost)} Months</h2>)
                :
                weeksSincePost ?
                  (<h2>{Math.round(weeksSincePost)} Weeks</h2>)
                  :
                  daysSincePost ?
                    (<h2>{Math.round(daysSincePost)} Days</h2>)
                    :
                    hoursSincePost ?
                      (<h2>{Math.round(hoursSincePost)} Hours</h2>)
                      :
                      minutesSincePost ?
                        (<h2>{Math.round(minutesSincePost)} Minutes</h2>)
                        :
                        secondsSincePost ?
                          (<h2>{Math.round(secondsSincePost)} Seconds</h2>)
                          :
                          (<h2></h2>)

          }</>)
          :
          (<></>)
      }
      {
        showContent ?
          (<div className={`postContent ${ showComments ? 'shrunk' : '' }`} onClick={(e) => {
            e.stopPropagation()
          }}>

            {showComments ?
              (
                <aside className='commentPanel'>
                  {commenting === true ?
                    (<>
                      <p id='commentLoading'>
                        <img src={'/Ninja placeholder.png'} />
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
                        comment({ content: commentContent, id: props.id, ip: props.ip }, setCommenting, (newComments) => {
                          commentContent = ''
                          setComments(newComments)
                        })
                      }}>
                        <i class="fas fa-caret-square-right"></i>
                      </button>
                    </>)}

                  {/* <div className='comments'>
                    {comments.map((com) => {
                      console.log(com)
                      return (<Comment
                        pageColour={com.user_id === props.userId ? '#000000' : 'transparent'}
                        username={com.username.slice(0, 10)}
                        date={com.formatteddate}
                        content={com.content}
                        avatar={com.avatar} />)
                    })}
                  </div> */}
                </aside>)
              :
              (
                <button className='commentPanelButton' onClick={() => {
                  setShowComments(true)
                }}>
                  <i class="far fa-comments"></i>
                </button>
              )
            }

            {/* Content */}
            <JsxParser
              components={{ FireText, IceText, ThunderText, EarthText }}
              jsx={props.content}
            />

          </div>)
          :
          (<></>)
      }
    </article>)
}