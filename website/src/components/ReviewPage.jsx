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

//Grabs the data of an article based off it's title
const getArticleData = ((params, cb)=>{
  axios({
    method: 'get',
    url: `http://localhost:5000/posts/${params.review}/`,
    headers: { 'Content-Type': 'application/json' },
  })
  .then((res) => {
    console.log(res.data.rows[0])
    cb(res.data.rows[0].title, res.data.rows[0].colour, res.data.rows[0].content, res.data.rows[0].formatteddate)
  })
  .catch((err) => {
    console.log(err);
  })
})

export default function PostsPage(props){

  const [title, setTitle] = useState('')
  const [colour, setColour] = useState('')
  const [content, setContent] = useState('')
  const [date, setDate] = useState('')

  const params = useParams();

  useEffect(()=>{
    getArticleData(params, (name, colour, content, date) => {
      setTitle(name);
      setColour(colour);
      setContent(content);
      setDate(date);
      console.log(content)
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
        />
        <article className='articleContainer' style={{boxShadow: `5px 5px 0px ${colour}`}}>
          <JsxParser
            components={{ Picture, ListItem, Underline, Quote, Paragraph, TitleCard }}
            
            jsx={content}
          />
        </article>
    </div>
  )
}