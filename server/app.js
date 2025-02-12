import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDB from './db/database.js';
import userRouter from './routes/user.js';
import todoRouter from './routes/todo.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();
const app = express();

// Connect to database
connectDB();

// Apply CORS Middleware **before routes**
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes (Placed after CORS)
app.use('/api/v1/user', userRouter);
app.use('/api/v1/todo', todoRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
