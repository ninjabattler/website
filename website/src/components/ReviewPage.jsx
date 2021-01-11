import { React, useEffect, useState } from 'react';
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

let ip;

//Grabs the data of an article based off it's title
const getArticleData = async (params, cb)=>{
  try {
    ip = await axios({ method: 'get', url: `https://api.ipify.org?format=json`, headers: { 'Content-Type': 'application/json' },})
    ip = ip.data.ip;

    const res = await axios({ method: 'get', url: `http://localhost:5000/posts/${params.review}/`, headers: { 'Content-Type': 'application/json' },})
  
    const data = res.data.rows[0];
    cb(
      data.title,
      data.colour,
      data.content,
      data.formatteddate,
      `${data.category} / ${data.genre}`,
      Math.round(data.likes - data.dislikes) * 100)
  }
  catch(err) {
    console.log(err);
  }
}

//Create a new like and a new user if they don't alreaday exist
const like = async (params, cb)=>{
  try {
    const res = await axios({ method: 'get', url: `http://localhost:5000/users/like`, params:{ip, like: params.like},  headers: { 'Content-Type': 'application/json' },})
    cb()
  }
  catch(err) {
    console.log(err);
  }
}

export default function PostsPage(props){

  const [title, setTitle] = useState('')
  const [colour, setColour] = useState('')
  const [content, setContent] = useState('')
  const [date, setDate] = useState('')
  const [categoryGenre, setCategoryGenre] = useState('')
  const [likes, setLikes] = useState(0)

  const params = useParams();

  useEffect(()=>{
    getArticleData(params, (name, colour, content, date, cg, likesRatio) => {
      setTitle(name);
      setColour(colour);
      setContent(content);
      setDate(date);
      setCategoryGenre(cg);
      setLikes(likesRatio);
    })
  }, [])

  return (
    <div id='reviewPage'>
      <VideoHeader 
          pageColour={colour}
          title={title}
        />
      <InfoBar
        date={date}
        categoryGenre={categoryGenre}
      />
      <div>
        <article className='articleContainer' style={{boxShadow: `5px 5px 0px ${colour}`}}>
          <JsxParser
            components={{ Picture, ListItem, Underline, Quote, Paragraph, TitleCard }}
            
            jsx={content}
          />  
          <ParticlesBg num={100} color={colour || '#101010'} type="cobweb" prewarm={true} bg={true} />
        </article>

        <aside id='commentPanel'>
          <aside id='likePanel'>
            <button onClick={() => {
              like({like: true, cb: ()=>{
                console.log('sdf')
              }})
            }}>
              <i class="far fa-thumbs-up"></i>
            </button>

            <div id='likeBar' style={{backgroundImage: `linear-gradient(90deg, ${colour} ${likes}%, transparent ${likes}%)`}}>

            </div>

            <button>
              <i class="far fa-thumbs-down"></i>
            </button>
          </aside>

          <textarea name="comment" placeholder="Leave a comment!" ></textarea>
        </aside>
      </div>
    </div>
  )
}