import { Router } from "express";
import {signin, signup, change_password} from "./auth.controller";

const router = Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.put("/password", change_password);

export default router;