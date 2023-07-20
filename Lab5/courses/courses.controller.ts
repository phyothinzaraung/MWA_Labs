import { RequestHandler } from "express";
import { BodyWithToken, ErrorResponse, IResponse } from "../types";
import Course, { ICourse } from "./courses.model";

export const add_course: RequestHandler<unknown, IResponse<string>, ICourse & BodyWithToken> = async (req, res, next) => {
    try {

        console.log("Token Data",req.body.token_data);
        const { _id, fullname, email } = req.body.token_data;
        const results = await Course.create({
            ...req.body,
            created_by: {
                _id,
                fullname,
                email
            }
        });
        res.json({ success: true, data: results._id.toString() })
    } catch (error) {
        next(error)
    }
}

export const get_courses: RequestHandler<unknown, IResponse<ICourse[]>, unknown, { page: number }> = async (req, res, next) => {
    try {
        const page_number: number = req.query.page || 1;
        const page_size = 10;
        const results = await Course.aggregate([
            { $sort: { _id: -1 } },
            { $skip: page_size * (page_number - 1) },
            { $limit: page_size },
            { $project: { lectures: 0, createdAt: 0, updatedAt: 0, created_by: 0} }
        ]);
        res.json({ success: true, data: results })
    } catch (error) {
        next(error);
    }
}


export const get_course_by_id: RequestHandler<{ course_id: string }, IResponse<ICourse>, BodyWithToken> = async (req, res, next) => {
    try {
        const {course_id} = req.params;
        const course = await Course.findOne({_id: course_id});
        if(!course) throw new ErrorResponse("Course Not Found", 404);
        res.json({success: true, data: course});
    } catch (error) {
        next(error);
    }
}

export const update_course_by_id: RequestHandler<{ course_id: string }, IResponse<number>, ICourse & BodyWithToken> = async (req, res, next) => {
    try {
        const { course_id } = req.params;
        const { _id: user_id, fullname, email } = req.body.token_data;
        const results = await Course.updateOne(
            { _id: course_id, 'created_by.user_id': req.body.token_data._id},
            { $set: { code: req.body.code, title: req.body.title }}
        )
        console.log(results)
        res.json({ success: true, data: results.modifiedCount })
    } catch (error) {
        next(error)
    }
}

export const delete_course_by_id: RequestHandler<{ course_id: string }, IResponse<number>, BodyWithToken> = async (req, res, next) => {
    try {
        const { course_id } = req.params;
        const { _id: user_id } = req.body.token_data;
        const results = await Course.deleteOne({ _id: course_id, 'created_by.user_id': user_id})
        res.json({ success: true, data: results.deletedCount })
    } catch (error) {
        next(error)
    }
}