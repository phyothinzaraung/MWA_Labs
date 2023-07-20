import {Router} from 'express';

import { get_lectures, get_lecture_by_id } from './lectures.controller';
import questionRouter from "../questions/questions.router";


const router = Router({mergeParams: true});

router.get("/", get_lectures);
router.get("/:lecture_id", get_lecture_by_id);

router.use("/:lecture_id/questions", questionRouter);

export default router;