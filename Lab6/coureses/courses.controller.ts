import { RequestHandler } from "express";
import mongoose, { Types } from "mongoose";

import { ErrorResponse, IResponse } from "../types";
import Course, { ICourse } from "./courses.model";

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

export const get_course_by_id: RequestHandler<{ course_id: string }, IResponse<ICourse>> = async (req, res, next) => {
    try {
        const {course_id} = req.params;

        console.log("course ID",course_id);
        const result = await Course.aggregate([
            {$match: { _id: new Types.ObjectId(course_id)}},
            { $project: {lectures: 0, createdAt: 0, updatedAt: 0}   }
        ]);
        if (!result) throw new ErrorResponse("Course Not Found", 404);
        res.json({ success: true, data: result[0] });
    } catch (error) {
        next(error);
    }
}