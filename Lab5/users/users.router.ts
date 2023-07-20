import { Router } from "express";
import { nearbyUser } from "./users.controller";

const router = Router();

router.get("/nearby", nearbyUser);

export default router;