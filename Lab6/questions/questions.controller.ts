import { RequestHandler } from "express";

import { IResponse } from "../types";
import { IQuestion } from "./questions.schema";
import Course from "../coureses/courses.model";
import mongoose, { Types } from "mongoose";

export const get_questions: RequestHandler<{ course_id: string, lecture_id: string }, IResponse<IQuestion[]>, unknown, { page: number }> = async (req, res, next) => {
  try {
    const page_number = req.query.page || 1;
    const page_size = 10;

    // const results = await Course.aggregate([
    //   {
    //     $match: {
    //       _id: new mongoose.Types.ObjectId(req.params.course_id),
    //       "lectures._id": new mongoose.Types.ObjectId(req.params.lecture_id)
    //     }
    //   },
    //   {
    //     $addFields: {
    //       questions: "$lectures.questions"
    //     }
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       questions: {
    //         $slice: ["$questions", page_size * (page_number - 1), page_size]
    //       }
    //     }
    //   }
    // ]);

    const results = await Course.aggregate([
      {$match: {_id: new mongoose.Types.ObjectId(req.params.course_id),"lectures._id": new mongoose.Types.ObjectId(req.params.lecture_id)}},
      {$unwind: '$lectures'},
      {$match: {'lectures._id': new mongoose.Types.ObjectId(req.params.lecture_id)}},
      {$project: {questions: {$slice: ['lectures.questions', page_size * (page_number-1), page_size]}}}
    ])

    const questions = results.length > 0 ? results[0].questions : [];
    res.json({ success: true, data: questions });
  } catch (error) {
    next(error)
  }
}

export const get_question_by_id: RequestHandler<{ course_id: string, lecture_id: string, question_id: string }, IResponse<IQuestion>> = async (req, res, next) => {
  try {
    // const results = await Course.aggregate([
    //   {
    //     $match: {
    //       _id: new mongoose.Types.ObjectId(req.params.course_id),
    //       "lectures._id": new mongoose.Types.ObjectId(req.params.lecture_id),
    //       "lectures.questions._id": new mongoose.Types.ObjectId(req.params.question_id)
    //     }
    //   },
    //   {
    //     $unwind: "$lectures"
    //   },
    //   {
    //     $unwind: "$lectures.questions"
    //   },
    //   {
    //     $match: {
    //       "lectures.questions._id": new mongoose.Types.ObjectId(req.params.question_id)
    //     }
    //   },
    //   {
    //     $replaceRoot: {
    //       newRoot: "$lectures.questions"
    //     }
    //   }
    // ]);

    const results = await Course.aggregate([
      {$match: {__id: new mongoose.Types.ObjectId(req.params.course_id),"lectures._id": new mongoose.Types.ObjectId(req.params.lecture_id), "lectures.questions._id": new mongoose.Types.ObjectId(req.params.question_id)}},
      {$unwind: "$lectures"},
      {$unwind: "$lectures.questions"},
      {$match: {"lectures.questions._id": new mongoose.Types.ObjectId(req.params.question_id)}},
      {$project: {_id: 0, question: '$lectures.questions'}}
    ]);

    const question = results.length > 0 ? results[0] : {} as IQuestion;
    res.json({ success: true, data: question });

  } catch (error) {
    next(error)
  }
}