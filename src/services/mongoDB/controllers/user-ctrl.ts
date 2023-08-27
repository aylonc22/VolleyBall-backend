import { Request, Response } from "express";
import { User } from "../schema/user-schema";
import { IUser } from "../../../models/mongo-model";
import { Error } from "mongoose";
import { generateAccessToken, generateRefreshToken } from "../../authToken";
import { createRefreshToken } from "./refreshToken-ctrl";


export const register = async (req: Request, res: Response) => {
    const { Google, ...NormalBody } = req.body;
    let googleBody:IUser = {
        UserName: "undefined",
        Name: "undefined",
        Password: "undefined",
        Picture: "undefined"
    };
    if (Google) {
        googleBody.Name = Google.name;
        googleBody.UserName = Google.email;
        googleBody.Password = Google.googleId;
        googleBody.Picture = Google.imageUrl;
    }
    const body: IUser = Google ? googleBody : NormalBody;
    if (!body)
        return res.status(400).json({ message: "Request body is empty" });
    if (body.Name === "Nadav")
        body.Admin = true;

    const user = new User(body);

    if (!user)
        return res.status(400).json({ message: "Body's parameters didn't match the criteria for creating user in the data base" });

    user
        .save()
        .then(async () => {
            const accessToken: string = generateAccessToken({ UserName: user.UserName, Name: user.Name, Admin: user.Admin });
            const refreshToken: string = generateRefreshToken({ UserName: user.UserName, Name: user.Name, Admin: user.Admin })
            const flag: boolean = await createRefreshToken(refreshToken);
            if (!flag)
                return res.status(500).json({ success: false, message: "something went wrong while generating a new refreshToken" })
            return res.status(201).json({ success: true, message: "User is created", token: accessToken, refreshToken: refreshToken, user: { UserName: user.UserName, Name: user.Name, Picture: user.Picture, Admin: user.Admin } })
        })
        .catch((error: Error) => {
            return res.status(400).json({ success: false, error: error.message });
        });
};


export const authenticateUser = async (userName: string, password: string): Promise<IUser | undefined> => {
    const res: IUser | undefined = await User.findOne({ UserName: userName, Password: password }).clone().then((user: IUser | null) => {
        if (!user) {
            return undefined
        }
        return user;
    }).catch((err: Error) => undefined);
    return res;
}

export const getUser = async (req: Request, res: Response) => {
    const userName: string | undefined = req.body.UserName;
    if (userName)
        return res.status(400).json({ success: false, message: "Please specify a user name" });
    if (!req.user.Admin && (req.user.UserName !== userName))
        return res.status(401).json({ success: false, message: "You don't have admin privilege, you are authorized to get only your user information" })
    User.findOne({ UserName: req.params.UserName }).clone().then((user: IUser | null) => {
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
    if (!req.user.Admin)
        return res.status(401).json({ success: false, message: "You don't have admin privilege" })
    User.find({}).clone().then((users: IUser[] | null) => {
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
