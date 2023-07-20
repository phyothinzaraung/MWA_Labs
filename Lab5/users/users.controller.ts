import { RequestHandler } from "express";
import { IResponse } from "../types";
import User, { IUser } from "../auth/auth.model";

export const nearbyUser: RequestHandler<unknown, IResponse<IUser[]>, { latitude: string, longitude: string, hobbies: [string] }> = async (req, res, next) => {
    try {
        const { latitude, longitude, hobbies } = req.query;
        const current_long = parseFloat(longitude as string);
        const current_lat = parseFloat(latitude as string);
        User.collection.createIndex({ location: '2dsphere' });
        const users = await User.find({
            hobbies: { $in: hobbies },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [current_long, current_lat]
                    },
                },
            }
        }).limit(10).collation({locale: 'en', strength: 2});



        res.json({ success: true, data: users });
    } catch (error) {
        next(error);
    }
}