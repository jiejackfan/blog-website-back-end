import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'
import postRoutes from './routes/posts.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({limit:"30mb", extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}));
app.use(cors());

app.use('/posts', postRoutes);

// greeting
app.get('/', (req, res) => {
    res.send('Hello to blog app\'s API');
})
//hello
// http://www.mongodb.com/cloud/atlas
const PORT = process.env.PORT || 5000;
// returns a promise
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> app.listen(PORT, ()=>console.log(`Server running on port : ${PORT}`)))
    .catch((err)=>console.log(err.message));

