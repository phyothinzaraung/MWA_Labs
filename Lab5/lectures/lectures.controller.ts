import { RequestHandler } from "express";
import { Types } from "mongoose";
import { BodyWithToken, IResponse } from "../types";
import { ILecture } from "./lectures.schema";
import Course from "../courses/courses.model";

export const add_lecture: RequestHandler<{ course_id: string }, IResponse<string>, ILecture & BodyWithToken> = async (req, res, next) => {
    try {
        const new_lecture = {
            _id: new Types.ObjectId(),
            ...req.body
        }
        const results = await Course.updateOne(
            { _id: req.params.course_id, "created_by.user_id": req.body.token_data._id },
            { $push: { lectures: new_lecture } }
        );
        res.json({ success: true, data: new_lecture._id.toString() });
    } catch (error) {
        next(error)
    }
}

export const get_lectures: RequestHandler<{ course_id: string }, IResponse<ILecture[]>, BodyWithToken, { page: number }> = async (req, res, next) => {
    try {
        const page_number = req.query.page || 1;
        const page_size = 10;
        const results = await Course.findOne(
            { _id: req.params.course_id },
            {
                lectures: { $slice: [page_size * (page_number - 1), page_size] }
            });
        res.json({ success: true, data: results?.lectures || [] })
    } catch (error) {
        next(error)
    }
}

export const get_lecture_by_id: RequestHandler<{ course_id: string, lecture_id: string }, IResponse<ILecture>, BodyWithToken> = async (req, res, next) => {
    try {
        const course = await Course.findOne(
            { _id: req.params.course_id, 'lectures._id': req.params.lecture_id },
            { "lectures.$": 1 }
        );
        res.json({ success: true, data: course ? course.lectures[0] : {} as ILecture });
    } catch (error) {
        next(error)
    }
}

export const update_lecture_by_id: RequestHandler<{ course_id: string, lecture_id: string }, IResponse<number>, ILecture & BodyWithToken> = async (req, res, next) => {
    try {
        const results = await Course.updateOne(
            {
                _id: req.params.course_id,
                "lectures._id": req.params.lecture_id,
                "created_by.user_id": req.body.token_data._id
            },
            {
                $set: {
                    "lectures.$.title": req.body.title,
                    "lectures.$.description": req.body.description,
                    "lectures.$.file_url": req.body.file_url
                }
            }
        );
        res.json({ success: true, data: results.modifiedCount });
    } catch (error) {
        next(error)
    }
}

export const delete_lecture_by_id: RequestHandler<{ course_id: string, lecture_id: string }, IResponse<number>, BodyWithToken> = async (req, res, next) => {
    try {
        const results = await Course.updateOne(
            {
                _id: req.params.course_id,
                "lectures._id": req.params.lecture_id,
                "created_by.user_id": req.body.token_data._id
            },
            {
                $pull: {lectures: {_id: req.params.lecture_id}}
            }
        );
        res.json({success: true, data: results.modifiedCount});
    } catch (error) {
        next(error)
    }
}