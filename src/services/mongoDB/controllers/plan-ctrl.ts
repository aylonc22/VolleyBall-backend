import { Request, Response } from "express";
import { User } from "../schema/user-schema";
import { Error } from "mongoose";
import { IEUser } from "../../../models/express-model";

export const createPlan = async (req: Request, res: Response) => {
    const { PlanName } = req.body;
    if (!PlanName)
        return res.status(400).json({ message: "Body is empty, plan name is required!" });
    const UserName: String = req.user.UserName;
    const user: IEUser = await User.findOneAndUpdate({ UserName: UserName }, { $push: { Plans: { Name: PlanName } } }, { returnOriginal: false })
        .catch((err: Error) => res.status(400).json({ message: err.message }))
        .then((r: any) => r)
    if (user.Plans)
        return res.status(201).json({ message: "Plan created", id: user.Plans[user.Plans.length - 1]._id });
    return res.status(500).json({ message: "something went wrong" });

}

// export const createTable = async (req: Request, res: Response) => {
//     const { PlanId, Name, Exercises, UserName } = req.body;
//     if (!UserName || !PlanId || !Name || !Exercises)
//         return res.status(400).json({ message: "Body is empty, planId, table and exercises are required" });
//     const user: IEUser = await User.findOneAndUpdate(plans,{ UserName: UserName,Plans:{"_id":PlanId} }, { $push: { Plans: { Name: PlanName } } }, { returnOriginal: false })
//         .catch((err: Error) => res.status(400).json({ message: err.message }))
//         .then((r: any) => r)
//     if (user.Plans)
//         return res.status(201).json({ message: "Plan created", id: user.Plans[user.Plans.length - 1]._id });
//     return res.status(500).json({ message: "something went wrong" });


// }