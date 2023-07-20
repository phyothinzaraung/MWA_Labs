import {Router} from 'express';
import { get_courses, get_course_by_id } from './courses.controller';
import lectureRouter from "../lectures/lectures.router";

const router = Router();

router.get("/", get_courses);
router.get("/:course_id", get_course_by_id);

router.use("/:course_id/lectures", lectureRouter)

export default router;