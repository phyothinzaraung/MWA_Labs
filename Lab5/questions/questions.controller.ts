import { RequestHandler } from "express";
import { Types } from "mongoose";
import { BodyWithToken, IResponse } from "../types";
import { IQuestion } from "./questions.schema";
import Course from "../courses/courses.model";
import { fork } from 'child_process';
import {join} from 'path';

export const add_question: RequestHandler<{ course_id: string, lecture_id: string }, IResponse<string>, IQuestion & BodyWithToken> = async (req, res, next) => {
    try {
        const new_question = {
            _id: new Types.ObjectId,
            ...req.body
        };
        const results = await Course.updateOne(
            {
                _id: req.params.course_id,
                "created_by.user_id": req.body.token_data._id,
                "lectures._id": req.params.lecture_id
            },
            {
                $push: {
                    'lectures.$.questions': new_question
                }
            }
        );
        res.json({ success: true, data: results.modifiedCount ? new_question._id.toString() : '' });
    } catch (error) {
        next(error)
    }
}

export const get_questions: RequestHandler<{ course_id: string, lecture_id: string }, IResponse<IQuestion[]>, BodyWithToken, { page: number }> = async (req, res, next) => {
    try {
        const page_number = req.query.page || 1;
        const page_size = 10;
        const results = await Course.findOne(
            { _id: req.params.course_id, "lectures._id": req.params.lecture_id},
            {
                'lectures.$': 1
                //'lectures.$.questions': { $slice: [page_size * (page_number - 1), page_size] }
            }
        ).skip(page_size * (page_number - 1)).limit(page_size);

        res.json({ success: true, data: results ? results.lectures[0].questions : [] })
    } catch (error) {
        next(error)
    }
}

export const get_question_by_id: RequestHandler<{ course_id: string, lecture_id: string, question_id: string }, IResponse<IQuestion>, BodyWithToken> = async (req, res, next) => {
    try {
        const results = await Course.findOne(
            { _id: req.params.course_id, 'lectures._id': req.params.lecture_id, "lectures.questions._id": req.params.question_id },
            {"lectures.$": 1}
        );

        //@ts-ignore
        // const question = results ? results.lectures[0].questions.filter((q: IQuestion) => q._id.toString() === req.params.question_id)[0] : {} as IQuestion;
        // res.json({success: true, data: question})
    

        const child = fork(join(__dirname,'questions.childprocess.ts'));
        child.send(JSON.stringify({results: JSON.stringify(results), question_id: req.params.question_id}));

        child.on('message', (question: string) => {
            res.json({success: true, data: JSON.parse(question)});
        });

        
    } catch (error) {
        next(error)
    }
}

export const update_question_by_id: RequestHandler<{ course_id: string, lecture_id: string, question_id: string}, IResponse<number>, IQuestion & BodyWithToken> = async (req, res, next) => {
    try {
        const results = await Course.updateOne(
            { _id: req.params.course_id, 'lectures._id': req.params.lecture_id, "lectures.questions._id": req.params.question_id },
            {
                $set: {
                    'lectures.$.questions.$[questionFilter].question' : req.body.question,
                    'lectures.$.questions.$[questionFilter].due_date' : req.body.due_date
                }
            },
            {
                arrayFilters: [{"questionFilter._id": req.params.question_id}]
            }
        );
        res.json({success: true, data: results.modifiedCount})
    } catch (error) {
        next(error)
    }
}

export const delete_question_by_id: RequestHandler<{ course_id: string, lecture_id: string, question_id: string }, IResponse<number>, BodyWithToken> = async (req, res, next) => {
    try {
        const results = await Course.updateOne(
            {
                 _id: req.params.course_id,
                 'lectures._id': req.params.lecture_id,
                 'lectures.questions._id': req.params.question_id
            },
            {
                $pull: {'lectures.$.questions': {_id: req.params.question_id}}
            }
        );
        res.json({success: true, data: results.modifiedCount})
    } catch (error) {
        next(error)
    }
}
