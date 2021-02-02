const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db/db');
const queries = require('./db/queries');
const postRoutes = require('./routes/postRouter');
const userRoutes = require('./routes/userRouter');
const path = require('path');

app.use(express.static(path.join(__dirname, 'build')))

db.connect()
.then(()=>{
  console.log('YO')
})
.catch((err) => {
  console.log(err)
})
app.use('/postData', postRoutes(db));
app.use('/users', userRoutes(db));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get("/about", function (req, res) {
  res.redirect('https://www.youtube.com/watch/dQw4w9WgXcQ')
});

app.use(cors())

app.listen(5000, () => {
  console.log("server has started on port 5000");
  // queries.insertNewPost(db, {
  //   title: "It is complete!",
  //   colour: '',
  //   category: '',
  //   genre: '',
  //   review: false,
  //   thumbnail: '',
  //   video_header: '',
  //   content: "<h1>YES</h1><p><span>Through the power of incomprehensible gibberish copied off of google, I have trancended you mortals and created a website! NYEHEHEHE!!!!</span></p><br></br><p>I don't know how often I'll post but if you have any suggestions, complaints, or you just want something to hate, I've linked my github on the footer for this site!</p>"})
})