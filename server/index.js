// import modules
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import * as dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import { MongoClient, ServerApiVersion } from 'mongodb';

// const uri = `mongodb+srv://user1000:test123@cluster0.qdpbtz9.mongodb.net/?retryWrites=true&w=majority` || `mongodb://127.0.0.1:27017`;
const uri = `mongodb://0.0.0.0:27017`;

// app
dotenv.config();

// db
mongoose.set('strictQuery', true);

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("DB CONNECTION ERROR", err));

// middleware
const app = express();
app.use(cors({ origin: true, credentials: true })); // add addtional middlerware
app.use(morgan("dev"));
app.use(express.json());

// routes
app.use('/api/user', userRoutes);


// port
const port = process.env.PORT || 8080;

// listener
const server = async () => {
    app.listen(port, () => console.log(`Server is running on port http://localhost:${port}`))
};

// If server not run
process.on("unhandledRejection", (err) => {
    console.log("error", err.message);
    server.close(() => {
        process.exit();
    })
});

server();
