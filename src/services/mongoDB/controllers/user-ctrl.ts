import { Request, Response } from "express";
import { User } from "../schema/user-schema";
import { User_Type } from "../../../models/user-model";
import { Error } from "mongoose";


export const insertUser = async (body: any, res: Response) => {

    if (!body)
        return;

    const user = new User(body);

    if (!user)
        return;

    user
        .save()
        .then(() => {
            return res.status(200).json({ success: true })
        })
        .catch((error: Error) => {
            return res.status(400).json({ success: false, error: error });
        });
};

export const getUser = async (req: Request, res: Response) => {
    User.findOne({ UserName: req.params.UserName, Password:req.params.Password }).clone().then((user: User_Type | null) => {
        console.log(user);
        if (!user) {
            return res
                .status(404)
                .json({ success: false, error: `user not found` });
        }
        return res.status(200).json({ success: true, data: user });
    }).catch((err: Error) => res
        .status(404)
        .json({ success: false, error: err }));
}

export const getUsers = async (req: Request, res: Response) => {

    User.find({}).clone().then((users: User_Type[] | null) => {
        if (users == null || !users.length) {
            return res
                .status(404)
                .json({ success: false, error: `users not found` });
        }
        return res.status(200).json({ success: true, data: users });
    }).catch((err: Error) => res
        .status(404)
        .json({ success: false, error: err }));
}

export const isInDB = async (userName: string) => {
    const bool = await User.exists({ UserName: userName });
    return bool;
}

export const deleteUser = async (req: Request, res: Response) => {
    await User.deleteMany({}, (err: Error) => {
        if (err)
            return res
                .status(404)
                .json({ success: false, error: err });

        return res.status(200).json({ succes: true });
    }).clone();
}
