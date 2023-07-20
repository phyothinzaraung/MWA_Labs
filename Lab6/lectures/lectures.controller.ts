import { RequestHandler } from "express";
import mongoose from "mongoose";

import { ErrorResponse, IResponse } from "../types";
import { ILecture } from "./lectures.schema";
import Course from "../coureses/courses.model";

export const get_lectures: RequestHandler<{ course_id: string }, IResponse<ILecture[]>, unknown, { page: number }> = async (req, res, next) => {
    try {
        const page_number: number = req.query.page || 1;
        const page_size = 10;
        const results = await Course.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(req.params.course_id) } },
            { $project: { _id: 0, 'letures.questions': 0 } },
            {$project: {lectures: { $slice: ["$lectures", page_size * (page_number - 1), page_size] }}}
        ]);
        
        res.json({ success: true, data: results })
    } catch (error) {
        next(error);
    }
}

export const get_lecture_by_id: RequestHandler<{ course_id: string, lecture_id:string }, IResponse<ILecture>> = async (req, res, next) => {
    try {
        // const result = await Course.aggregate([
        //     {$match: {_id: new mongoose.Types.ObjectId(req.params.course_id)}},
        //     {$unwind: "$lectures"},
        //     {
        //       $match: {
        //         "lectures._id": new mongoose.Types.ObjectId(req.params.lecture_id)
        //       }
        //     },
        //     {
        //       $project: {
        //         _id: "$lectures._id",
        //         title: "$lectures.title",
        //         description: "$lectures.description",
        //         file_url: "$lectures.file_url"
        //       }
        //     }
        //   ]);

        const result = await Course.aggregate([
          {$match: {_id: new mongoose.Types.ObjectId(req.params.course_id), "lectures._id": new mongoose.Types.ObjectId(req.params.lecture_id)}},
          {$project: {_id: 0,'lectures.questions': 0}},
          {$unwind: "$lectures"},
          {$match: {"lectures._id": new mongoose.Types.ObjectId(req.params.lecture_id)}}
        ]);
          
          const lecture = result.length > 0 ? result[0] : {} as ILecture;
          res.json({ success: true, data: lecture });
    } catch (error) {
        next(error);
    }
}