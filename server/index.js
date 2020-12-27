const express = require('express');
const app = express();
const db = require('./db/db');
const queries = require('./db/queries');
const postRoutes = require('./routes/postRouter');

db.connect()
.then(()=>{
  console.log('YO')
})
app.use('/posts', postRoutes(db));

app.get('/', (req, res)=>{
  
})

app.listen(5000, () => {
  console.log("server has started on port 5000");

})