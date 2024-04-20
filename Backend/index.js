import express from 'express';
import connectDb from './config/mongodb.js';
import cookieparser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config()
import router from './Routes/router.js'

connectDb()

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cookieparser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));


app.use(express.urlencoded({ extended : true }));

app.use('/',router)

app.listen(port,()=>{
    console.log('listening on port '+port);
})