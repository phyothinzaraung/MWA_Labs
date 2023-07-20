import {Router} from 'express';

import {add_lecture, get_lectures, get_lecture_by_id, update_lecture_by_id, delete_lecture_by_id} from "./lectures.controller";
import questionRouter from "../questions/questions.router";
import {verifyToken} from "../auth/auth.middleware";

const router = Router({mergeParams: true});

router.post("/", add_lecture);
router.get("/", get_lectures);
router.get("/:lecture_id", get_lecture_by_id);
router.put("/:lecture_id", update_lecture_by_id);
router.delete("/:lecture_id", delete_lecture_by_id);

router.use("/:lecture_id/questions",verifyToken, questionRouter);

export default router;