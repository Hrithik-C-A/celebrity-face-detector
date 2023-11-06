import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import cors from 'cors';
import { handleSignin } from './controllers/signin.js';
import { handleRegister } from './controllers/register.js';
import { handleImageApi, handleImageEntries, handleCelebrityImageApi } from './controllers/image.js';
import { handleProfileGet } from './controllers/profile.js';
import knex from 'knex';

const saltRounds = 10;

const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized : false},
      host : process.env.DATABASE_HOST,
      port : 5432,
      user : process.env.DATABASE_USER,
      password : process.env.DATABASE_PW,
      database : process.env.DATABASE_DB
    }
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: `${process.env.FRONTEND_URI}`,
    credentials: true
}));

app.get('/',(req, res)=>{
    res.send('Api is running...')
});

app.post('/signin', (req, res)=> handleSignin(req, res, db, bcrypt));

app.post('/register', (req, res)=> handleRegister(req, res, db, bcrypt, saltRounds));

app.get('/profile/:id', (req, res)=> handleProfileGet(req, res, db));

app.put('/image',(req, res)=> handleImageEntries(req, res, db));

app.post('/imageurl', (req, res)=> handleImageApi(req, res));

app.post('/imageurl/celebrity',(req, res)=> handleCelebrityImageApi(req, res, db));

app.listen(process.env.PORT,()=>{
    console.log('Server is running...');
});