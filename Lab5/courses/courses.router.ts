import { Router } from "express";

import { add_course, get_courses, get_course_by_id, update_course_by_id, delete_course_by_id } from "./courses.controller";
import lectureRouter from "../lectures/lectures.router";
import {verifyToken} from "../auth/auth.middleware";

const router = Router({mergeParams: true});

router.post("/", add_course);
router.get("/", get_courses);
router.get("/:course_id", get_course_by_id);
router.put("/:course_id", update_course_by_id);
router.delete("/:course_id", delete_course_by_id);

router.use("/:course_id/lectures", verifyToken, lectureRouter );

export default router;