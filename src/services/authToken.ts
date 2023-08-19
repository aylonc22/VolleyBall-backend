import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IAUser } from '../models/express-model';


const {ACCESS_TOKEN_SECRET,REFRESH_TOKEN_SECRET} = process.env
export const generateAccessToken: Function = (user: object): string => {
    return jwt.sign(user, ACCESS_TOKEN_SECRET as string, { expiresIn: '15s' });
}

export const generateRefreshToken: Function = (user: object): string => {
    return jwt.sign(user, REFRESH_TOKEN_SECRET as string);
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader: string | undefined = req.headers.authorization;
    const token: string | undefined = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res.status(401).json({ message: "Token in unauthorized" });

    jwt.verify(token,ACCESS_TOKEN_SECRET as string,(err,user)=>{       
        if(err)
            return res.status(403).json({message:"Token is forbidden"});
        req.user = user as IAUser;
        next();
    })
}