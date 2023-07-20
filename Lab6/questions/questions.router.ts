import {Router} from 'express';
import { get_questions, get_question_by_id } from './questions.controller';

const router = Router({mergeParams: true});

router.get("/", get_questions);
router.get("/:question_id", get_question_by_id);

export default router;