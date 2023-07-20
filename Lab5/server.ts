import express, {Request, Response, NextFunction} from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRouter from "./auth/auth.router";
import morgan from 'morgan';
import { ErrorResponse, IResponse } from './types';
import courseRouter from "./courses/courses.router";
import {verifyToken} from "./auth/auth.middleware";
import userRouter from "./users/users.router";

dotenv.config();

const app = express();

//connect to mongoDB
//async await
(async function () {
    try{
        if(!process.env.MONGO_URI){
            console.log("DB URI is null");
            process.exit(1);
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log('connected to Mongo DB');
    }catch(error){
        console.log("DB connection failed: ", error);
        process.exit(1);
    }
})();

//Promise
// mongoose
//     .connect(process.env.MONGO_URI || '', {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     } as ConnectOptions)
//     .then(() => {
//         console.log('Connected to MongoDB');
//     })
//     .catch((error) => {
//         console.error('MongoDB connection error:', error);
//         process.exit(1);
//     });

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use("/courses", verifyToken, courseRouter);
app.use("/users", userRouter);

app.all('*', (req, res, next) => next(new Error("Route Not Found!")));

app.use((error: ErrorResponse, req: Request, res: Response<IResponse<string>>, next: NextFunction) =>{
    res.status(error.status || 500).json({success: false, data: error.message})
});

app.listen(3000, () => {
    console.log("Listening to 3000");
})

process.on('exit', ()=>{
    mongoose.disconnect();
})