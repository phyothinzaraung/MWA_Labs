import {Router} from "express";
import {add_tag, get_tags, get_tag_by_id, delete_tag_by_id, update_tag_by_id} from "./tags.controller"

const tag_router = Router({mergeParams: true});

tag_router.get("/", get_tags);
tag_router.post("/", add_tag);
tag_router.get("/:tag_id", get_tag_by_id);
tag_router.delete("/:tag_id", delete_tag_by_id);
tag_router.put("/:tag_id", update_tag_by_id);

export default tag_router