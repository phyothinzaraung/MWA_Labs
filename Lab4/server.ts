
import express,{json, Request, Response, NextFunction} from "express";
import morgan from "morgan";
import fs from "fs";
import path from "path";

import blogRouter from "./blogs/blogs.router";

const app = express();

app.use(json());

const accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {flags: 'a'});
app.use(morgan("combined", {stream: accessLogStream}));

app.use("/blogs", blogRouter);

app.all("*", (req, res, next) => {
    next(new Error('Route not found'))
});

app.use((err: Error, req: Request, res: Response, next: NextFunction)=>{
    res.status(500).json({success: false, message: err.message});
});


app.listen(3000, ()=> {console.log("Listening to 3000")});