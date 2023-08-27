import * as dotenv from 'dotenv';
dotenv.config();
import express, { Express, Request, Response } from 'express';
import { IUser } from './src/models/mongo-model';
import { createRefreshToken, deleteRefreshToken, isRefreshTokenIn } from './src/services/mongoDB/controllers/refreshToken-ctrl';
import jwt from 'jsonwebtoken';
import { authenticateToken, generateAccessToken, generateRefreshToken } from './src/services/authToken';
import { IAUser } from './src/models/express-model';
const { REFRESH_TOKEN_SECRET } = process.env;
import { db } from "./src/services/mongoDB/mongoConnection";
import { authenticateUser, register } from './src/services/mongoDB/controllers/user-ctrl';
import cors from 'cors';

const app: Express = express();
app.use(express.json());
app.use(cors());


//Register
// UserName: String,Name: String,Password: String,Picture: String,
app.post('/register', register);

//Login Auth
//Need UserName && Paswword
app.post('/login', async (req: Request, res: Response) => {    
    const { UserName, Password, Google } = req.body;
    if (!UserName || !Password)
        return res.status(401).json({ message: "Body missing username or password" });
    const authenticate: IUser | undefined = await authenticateUser(UserName, Password);
    if (!authenticate && !Google)
        return res.status(401).json({ message: "User was not found" });
    else
        if(!authenticate)
            return await register(req,res);
    const accessToken: string = generateAccessToken({ UserName: UserName, Name: authenticate.Name, Admin: authenticate.Admin });
    const refreshToken: string = generateRefreshToken({ UserName: UserName, Name: authenticate.Name, Admin: authenticate.Admin });
    if (!await createRefreshToken(refreshToken))
        return res.status(501).json({ message: "There was an error while creating new refresh token" });
    return res.status(201).json({ message: "access granted", token: accessToken, refreshToken: refreshToken, user: { UserName: authenticate.UserName, Name: authenticate.Name, Picture: authenticate.Picture, Admin: authenticate.Picture } })

});

//Logout
// need to pass authentication && refreshToken
app.post("/logout", authenticateToken, async (req: Request, res: Response) => {
    const refreshToken: string | undefined = req.body.refreshToken
    if (!refreshToken)
        return res.status(401).json({ message: "please pass refreshToken" });
    if (!await isRefreshTokenIn(refreshToken))
        return res.status(403).json({ message: "Token is forbidden" });
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET as string, async (err, user) => {
        user = user as IAUser;
        if (err)
            return res.status(401).json({ message: "Token is forbidden" });
        if (!await deleteRefreshToken(refreshToken))
            return res.status(501).json({ message: "Something went wrong while deleting the token" });
        return res.status(201).json({ message: "refreshToken deleted, you are disconnected" });
    })

});

//Token
//Need refresh token
app.post('/token', async (req: Request, res: Response) => {
    const refreshToken: string | undefined = req.body.Token;
    if (!refreshToken)
        return res.status(401).json({ message: "Token is missing" });
    if (!await isRefreshTokenIn(refreshToken))
        return res.status(403).json({ message: "Token is forbidden" });
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET as string, (err, user) => {
        user = user as IAUser;
        if (err)
            return res.status(401).json({ message: "Token is forbidden" });
        const accessToken: string = generateAccessToken({ UserName: user.UserName, Name: user.Name });
        res.status(201).json({ accessToken: accessToken });
    })


});

app.listen(process.env.PORT2, () => console.log(`[Server] is running on port ${process.env.PORT2}`));


db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log("[Mongo] database connection established successfully");
});