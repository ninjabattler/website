import { React, useState } from 'react';
import "./stylesheets/AudioPlayer.css";

export default function AudioPlayer(props) {
  let playInterval;
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
  const color = props.pageColour || '#292929'
  const id = `audio${numbers[Math.floor(Math.random() * 10)]}${numbers[Math.floor(Math.random() * 10)]}${numbers[Math.floor(Math.random() * 10)]}${numbers[Math.floor(Math.random() * 10)]}${numbers[Math.floor(Math.random() * 10)]}`
  const [playing, setPlaying] = useState(false)
  const [duration, setDuration] = useState(null)
  const [time, setTime] = useState(null)

  const formatTime = (time) => {
    let [minutes, seconds] = [0, time]

    while (seconds > 60) {
      minutes += 1
      seconds -= 60
    }

    seconds = Math.floor(seconds)

    return `${minutes > 10 ? minutes : '0' + minutes}:${seconds > 10 ? seconds : '0' + seconds}`
  }

  return (
    <div className='audioPlayer'>
      {/*Audio Src*/}
      <style>
        {`input[type='range']::-webkit-slider-thumb {
            box-shadow: -800px 0 0 800px ${color};
          }`}
      </style>
      <audio
        id={id}
        onCanPlay={(e) => {
          setDuration(e.target.duration)
          setTime(0)
        }}
        onPlay={(e) => {
          playInterval = setInterval(() => {
            setTime(e.target.currentTime)
          }, 100)
        }}
        onPause={(e) => {
          clearInterval(playInterval)
          console.log('hi')
        }}>
        <source src={props.src} type='audio/mp3'></source>
      </audio>

      <span>{props.title}</span>

      <input
        type='range'
        min={0}
        max={1000}
        value={(time / duration) * 1000 || 0}
        onChange={(e) => {
          const player = document.getElementById(id)
          setTime((e.target.value / 1000) * duration)
          player.currentTime = (e.target.value / 1000) * duration
        }}></input>

      <span>{time ? formatTime(time) : '--:--'}/{duration ? formatTime(duration) : '--:--'}</span>
      {playing ?
        (<i
          class="fas fa-pause-circle"
          onClick={() => {
            const player = document.getElementById(id)
            player.pause()
            setPlaying(false)
          }}>
        </i>)
        :
        (<i
          class="fas fa-play-circle"
          onClick={() => {
            const player = document.getElementById(id)
            player.play()
            setPlaying(true)
          }}>
        </i>)}
    </div>
  )
}