import { RequestHandler } from "express";
import { v4 as uuidv4 } from 'uuid';

import { IResponse } from "../types";
import { ITag } from "./tags.model";
import { data, IBlog } from "../blogs/blogs.model";

export const add_tag: RequestHandler<{ blog_id: string }, IResponse<IBlog[]>, { tag: string }> = (req, res, next) => {
    const blog = data.blogs.filter(blog => blog._id == req.params.blog_id)[0];
    if(blog){
        blog.tags.push({ _id: uuidv4(), ...req.body });
    }else{
        throw new Error(`cannot add tag, because no blog with id: ${req.params.blog_id}`);
    }
    res.json({ success: true, data: data.blogs });
}

export const get_tags: RequestHandler<{ blog_id: string }, IResponse<ITag[]>> = (req, res, next) => {
    const blog = data.blogs.find(blog => blog._id === req.params.blog_id);
    if (!blog) {
        throw new Error(`cannot add tag, because no blog with id: ${req.params.blog_id}`);
    } else {
        res.json({ success: true, data: blog.tags });
    }
}

export const get_tag_by_id: RequestHandler<{ blog_id: string, tag_id: string }, IResponse<ITag>> = (req, res, next) => {
    const blog = data.blogs.find(blog => blog._id === req.params.blog_id);
    if (!blog) {
        throw new Error(`cannot add tag, because no blog with id: ${req.params.blog_id}`);
    } else {
        const tag = blog.tags.filter(tag => tag._id === req.params.tag_id)[0];
        if (tag) {
            res.json({ success: true, data: tag });
        } else {
            throw new Error(`There is no tag with the id: ${req.params.tag_id}`);
        }
    }
}

export const delete_tag_by_id: RequestHandler<{ blog_id: string, tag_id: string }, IResponse<ITag[]>> = (req, res, next) => {
    const blog = data.blogs.find(blog => blog._id === req.params.blog_id);
    if (!blog) {
        throw new Error(`cannot add tag, because no blog with id: ${req.params.blog_id}`);
    } else {
        const index = blog.tags.findIndex(tag => tag._id === req.params.tag_id);
        if (index > -1) {
            blog.tags.splice(index, 1);
            res.json({ success: true, data: blog.tags });
        } else {
            throw new Error(`There is no tag with the id: ${req.params.tag_id}`);
        }
    }
}

export const update_tag_by_id: RequestHandler<{ blog_id: string, tag_id: string }, IResponse<ITag[]>, ITag, unknown> = (req, res, next) => {
    const blog = data.blogs.find(blog => blog._id === req.params.blog_id);
    if (!blog) {
        throw new Error(`cannot add tag, because no blog with id: ${req.params.blog_id}`);
    } else {

        const index = blog.tags.findIndex(tag => tag._id === req.params.tag_id);
        if(index > -1){
            blog.tags[index]._id = req.params.tag_id;
            blog.tags[index].tag = req.body.tag;
        }else{
            throw new Error(`cannot add tag, because no tag with id: ${req.params.tag_id}`);
        }

        res.json({success: true, data: blog.tags})

    }

}