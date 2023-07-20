import {Router} from 'express';

import {add_question, get_questions, get_question_by_id, update_question_by_id, delete_question_by_id} from "./questions.controller";

const router = Router({mergeParams: true});

router.post("/", add_question);
router.get("/", get_questions);
router.get("/:question_id", get_question_by_id);
router.put("/:question_id", update_question_by_id);
router.delete("/:question_id", delete_question_by_id);

export default router;