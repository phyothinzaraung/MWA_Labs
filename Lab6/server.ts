import express, {json, Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';

import { ErrorResponse, IResponse } from '../homework-05-phyothinzaraung/types';
import courseRouter from "./coureses/courses.router";

dotenv.config();
const app = express();

(async function () {
    try{
        if(!process.env.MONGO_URI){
            console.log("DB URI is null");
            process.exit(1);
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to Mongo DB...");
    }catch(error){
        console.log("DB Connection Failed :", error);
    }
})();

app.use(morgan('dev'));
app.use(json());

app.use("/courses", courseRouter);


app.use((error: ErrorResponse, req: Request, res: Response<IResponse<string>>, next: NextFunction) =>{
    res.status(error.status || 500).json({success: false, data: error.message})
});

app.use("*", (req, res, next) => {
    next(new Error("Route Not Found"));
})

app.listen(3000, ()=> console.log("Listening to 3000..."))

