import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import {ErrorResponse} from "../types"

export const verifyToken: RequestHandler = (req, res, next) => {
    try{
        const header = req.headers.authorization;
        if(!header) throw new ErrorResponse("Token is required", 404);
        
        const token = header.split(' ')[1];
        const plain_token = jwt.verify(token, process.env.JWT_SECRET!);
        req.body['token_data'] = plain_token;

        next();
    }catch(error){
        next(error);
    }
}