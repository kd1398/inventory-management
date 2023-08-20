// import modules
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import * as dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';

// app
dotenv.config();

// db
// mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
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
