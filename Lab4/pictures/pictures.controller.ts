import multer from "multer";
import { RequestHandler, Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import {join} from "path";

import { IResponse } from "../types";
import { IPicture } from "./pictures.model";
import { data } from "../blogs/blogs.model";

export const add_picture: RequestHandler<{ blog_id: string }, IResponse<IPicture[]> > = (req, res, next) => {
    try{
        const blog = data.blogs.find(blog => blog._id === req.params.blog_id);
        if(!blog) throw new Error("Blog Not Found");
        if(!blog.pictures) blog.pictures = [];
        if(!req.file) throw new Error("No File Found");
        blog.pictures.push({
            _id: uuidv4(),
            filename: req.file?.filename
        });

        res.json({success: true, data: blog.pictures})
    }catch(error){
        next(error)
    }
}

export const get_picture_by_id: RequestHandler<{blog_id: string, picture_id: string}> = (req, res, next) => {
    try{
        const blog = data.blogs.find(blog => blog._id === req.params.blog_id);
        if(!blog) throw new Error("Blog Not Found");
        if(!blog.pictures) throw new Error("Pictures Not Found");

        const pic = blog.pictures.find(pic => pic._id === req.params.picture_id);
        if(!pic)throw new Error("Picture Not Found");

        res.sendFile(join(__dirname, "../", "uploads", pic.filename));
    }catch(error){
        next(error);
    }
}

