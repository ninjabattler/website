const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db/db');
const queries = require('./db/queries');
const postRoutes = require('./routes/postRouter');
const userRoutes = require('./routes/userRouter');

db.connect()
.then(()=>{
  console.log('YO')
})
app.use('/posts', postRoutes(db));
app.use('/users', userRoutes(db));

app.use(cors())

app.get('/', (req, res)=>{
  
})

app.listen(5000, () => {
  console.log("server has started on port 5000");

})