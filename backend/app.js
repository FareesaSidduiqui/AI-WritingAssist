require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const port = process.env.PORT || 8000

app.use(cors({
  credentials:true,
origin: 'https://ai-writingassist-frontend.onrender.com'
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const db = process.env.MONGODB_URI

async function aap(){
  await mongoose.connect(db)
}

aap().then(()=>{
  console.log('congrats got connected');
  
}).catch((err)=>{
  console.log('got Error',err);
  
})

app.use('/api/analyze',require('./routes/analyze'))
app.use('/api/grammer',require('./routes/grammerCheck'))
app.use('/api/spell',require('./routes/spellCheck'))
app.use('/api/auth',require('./routes/auth'))

// https://api.openai.com/v1/chat/completions

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    // stack: err.stack, // Optional: useful for debugging
  });
});


app.listen(port ,()=>{
    console.log('server is listening on 8000');
    
})

  