import { Router } from "express";
import multer from 'multer'

import {add_picture, get_picture_by_id} from "./pictures.controller"

const picture_router = Router({mergeParams: true});

const upload = multer({ dest: 'uploads/' })

picture_router.post("/", upload.single('blog_picture') ,add_picture);
picture_router.get("/:picture_id", get_picture_by_id);

export default picture_router;