import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import path from 'path';
import bcrypt from 'bcrypt';
import cors from 'cors';
import { handleSignin } from './controllers/signin.js';
import { handleRegister } from './controllers/register.js';
import { handleImageApi, handleImageEntries } from './controllers/image.js';
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
app.use(cors());

app.post('/signin', (req, res)=> handleSignin(req, res, db, bcrypt));

app.post('/register', (req, res)=> handleRegister(req, res, db, bcrypt, saltRounds));

app.get('/profile/:id', (req, res)=> handleProfileGet(req, res, db));

app.put('/image',(req, res)=> handleImageEntries(req, res, db));

app.post('/imageurl', (req, res)=> handleImageApi(req, res));

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
} else {
    app.get('/',(req, res)=>{
        res.send('Api is running...')
    });
}

app.listen(process.env.PORT,()=>{
    console.log('Server is running...');
});