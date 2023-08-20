// import modules
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import * as dotenv from 'dotenv';

// app
dotenv.config();

// db

// middleware
const app = express();
app.use(cors({ origin: true, credentials: true })); // add addtional middlerware
app.use(morgan("dev"));
// app.use(express.json({ limit: '50mb' }));


// routes

// port
const port = process.env.PORT || 8080;

// listener
const server = async () => {
    app.listen(port, () => console.log(`Server is running on port http://localhost:${port}`))
};

server();
