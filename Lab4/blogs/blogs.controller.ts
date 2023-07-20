import { RequestHandler } from "express";
import { v4 as uuidv4 } from 'uuid';

import { IResponse } from "../types";
import { IBlog } from "./blogs.model";
import { data } from "./blogs.model";

//req_params, res_body, req_body, req_query
export const add_blog: RequestHandler<unknown, IResponse<IBlog[]>, { title: string, body: string }> = (req, res, next) => {
    if (req.body.title.length === 0 || req.body.body.length === 0) {
        throw new Error("Fields from blog cannot be empty");
    } else if (req.body.title.length >= 100) {
        throw new Error("Title cannot exceed 100 characters");
    }else{
        data.blogs.push({
            _id: uuidv4(),
            ...req.body,
            tags: []
        });
    }
    res.json({ success: true, data: data.blogs })
}

export const get_blogs: RequestHandler<unknown, IResponse<IBlog[]>> = (req, res, next) => {
    res.json({ success: true, data: data.blogs })
}

export const get_blog_by_id: RequestHandler<{ blog_id: string }, IResponse<IBlog>> = (req, res, next) => {
    const blog = data.blogs.filter(blog => blog._id === req.params.blog_id)[0];
    if (blog) {
        res.json({ success: true, data: blog });
    } else {
        throw new Error("ID is not found");
    }

}

export const delete_blog_by_id: RequestHandler<{ blog_id: string }, IResponse<IBlog[]>> = (req, res, next) => {
    try {
        const index = data.blogs.findIndex(blog => blog._id === req.params.blog_id);
        data.blogs.splice(index, 1);
        res.json({ success: true, data: data.blogs });
    } catch (error) {
        next(error)
    }
}

export const update_blog_by_id: RequestHandler<{ blog_id: string }, IResponse<IBlog[]>, IBlog, unknown> = (req, res, next) => {

    const index = data.blogs.findIndex(blog => blog._id === req.params.blog_id);
    if(index > -1){
        if(req.body.title.length ===0 || req.body.body.length === 0){
            throw new Error("Fields from blog cannot be empty");
        }else if (req.body.title.length >= 100){
            throw new Error("Title cannot exceed 100 characters");
        }else{
            data.blogs[index]._id = req.params.blog_id;
            data.blogs[index].title = req.body.title;
            data.blogs[index].body = req.body.body;
        }
        
    }else{
        throw new Error(`No Blog with id ${req.params.blog_id}`);
    }

    res.json({ success: true, data: data.blogs });
}

