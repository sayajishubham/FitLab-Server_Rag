const express = require('express');
require("dotenv").config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRouter = require('./Router/user.router');
const workoutRouter = require('./Router/workout.router');
const dietRouter = require('./Router/diet.router');
const connection = require('./config/db');
const { ingest } = require('./services/ingestion');

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
async function initializeRAG(retries = 10) {
    while (retries > 0) {
        try {
            await ingest();
            console.log("✅ RAG Vector Store Ready");
            return;
        } catch (err) {
            console.log("⏳ Chroma not ready. Retrying in 8 seconds...");
            retries--;
            await new Promise(res => setTimeout(res, 8000));
        }
    }

    console.error("❌ Failed to initialize RAG after retries.");
}
async function startServer() {
    try {
        await connection;
        console.log("MongoDB Connected");

        await initializeRAG();
        console.log("RAG Vector Store Ready");

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error("❌ Server Startup Error:", error);
        process.exit(1);
    }
}

startServer();