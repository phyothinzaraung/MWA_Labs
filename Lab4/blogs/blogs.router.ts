import {Router} from "express";

import tag_router from "../tags/tags.router";
import {add_blog, get_blogs, get_blog_by_id, delete_blog_by_id, update_blog_by_id} from "./blogs.controller";
import picture_router from "../pictures/pictures.router";

const router = Router();

router.get("/", get_blogs);
router.post("/", add_blog);
router.get("/:blog_id", get_blog_by_id);
router.delete("/:blog_id", delete_blog_by_id);
router.put("/:blog_id", update_blog_by_id);

router.use("/:blog_id/tags/", tag_router);
router.use("/:blog_id/pictures/", picture_router);

export default router;