const express = require('express')
const app = express();
const db = require('./db/db');
const queries = require('./db/queries');

db.connect()
.then(()=>{
  console.log('YO')
})
app.get('/', (req, res)=>{
  
})

app.listen(5000, () => {
  console.log("server has started on port 5000");
  queries.createDb(db);
})