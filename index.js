const express = require('express');
require("dotenv").config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./Router/user.router');
const workoutRouter = require('./Router/workout.router');
const dietRouter = require('./Router/diet.router');
const connection = require('./config/db');

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());


//routers
app.use('/api/users', userRouter);
app.use('/api/diet', dietRouter);
app.use('/api/workout', workoutRouter);

app.listen(process.env.PORT || 5000, async () => {
    try {
        await connection;
        console.log("server is running");
    } catch (error) {
        console.log(error);
    }
});