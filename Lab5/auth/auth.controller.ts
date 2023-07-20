import { RequestHandler } from "express";
import { ErrorResponse, IResponse } from "../types";
import User, { IUser } from "./auth.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signin: RequestHandler<unknown, IResponse<string>, { email: string, password: string }> = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) throw new ErrorResponse('User not found', 404);

        const matchPassword = await bcrypt.compare(password, user.password!)
        if (!matchPassword) throw new ErrorResponse("Password do not match", 404);

        if (!process.env.JWT_SECRET) throw new ErrorResponse("Private key is not found", 400);

        const jwt_token = jwt.sign({
            _id: user._id,
            fullname: user.name?.first + " " + user.name?.last,
            email: user.email
        }, process.env.JWT_SECRET)

        res.json({ success: true, data: jwt_token });
    } catch (error) {
        next(error)
    }
}

export const signup: RequestHandler<unknown, IResponse<string>, IUser> = async (req, res, next) => {
    try {
        if (!req.body.password) {
            throw new ErrorResponse("Password is required", 400);
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const results = await User.create({
            ...req.body,
            password: hashedPassword
        });
        res.send({ success: true, data: results._id.toString() })
    } catch (error) {
        next(error)
    }
}

export const change_password: RequestHandler<unknown, IResponse<number>, { email: string, old_password: string, new_password: string }> = async (req, res, next) => {
    try {
        const { email, old_password, new_password } = req.body;

        const user = await User.findOne({ email });
        if (!user) throw new ErrorResponse('User not found', 404);

        if (old_password === new_password) {
            throw new ErrorResponse("Old password and new password should not be the same", 404);
        }

        const matchPassword = await bcrypt.compare(old_password, user.password!)
        if (!matchPassword) throw new ErrorResponse("Old Password is not correct", 404);

        const hased_new_password = await bcrypt.hash(new_password, 10);

        const result = await User.updateOne(
            { email },
            { $set: { password: hased_new_password } }
        );

        res.json({ success: true, data: result.modifiedCount });

    } catch (error) {
        next(error)
    }
}

