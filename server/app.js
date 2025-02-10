import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDB from './db/database.js';
import userRouter from './routes/user.js';
import todoRouter from './routes/todo.js';
import cookieParser from 'cookie-parser';
const app = express();
dotenv.config();

connectDB();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/todo', todoRouter);
app.use(cookieParser());


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})
