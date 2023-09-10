import { Request, Response } from "express";
import { User } from "../schema/user-schema";
import { Error } from "mongoose";
import { IEPlan, IETable, IEUser } from "../../../models/express-model";

export const createPlan = async (req: Request, res: Response) => {
    const { PlanName } = req.body;
    if (!PlanName)
        return res.status(400).json({ message: "Body is empty, plan name is required!" });
    const UserName: String = req.user.UserName;
    if (!UserName)
        return res.status(400).json({ message: "user is missing" });
    let _err: String = "";
    const user: IEUser = await User.findOneAndUpdate({ UserName: UserName }, { $push: { Plans: { Name: PlanName } } }, { returnOriginal: false })
        .catch((err: Error) => _err = err.message)
        .then((r: any) => r)
    if (_err != "")
        return res.status(400).json({ message: _err });
    if (user && user.Plans)
        return res.status(201).json({ message: "Plan created", id: user.Plans[user.Plans.length - 1]._id });
    return res.status(500).json({ message: "something went wrong" });

}

export const createTable = async (req: Request, res: Response) => {
    const { PlanId, Name, Exercises } = req.body;
    if (!PlanId || !Name || !Exercises)
        return res.status(400).json({ message: "Body is empty, planId, table and exercises are required" });
    let _err: String = "";
    const user: IEUser = await User.findOneAndUpdate({ "Plans._id": PlanId }, { $push: { "Plans.$.Tables": { "Name": Name, "Exercises": { "Name": "test" } } } }, { returnOriginal: false })
        .catch((err: Error) => _err = err.message)
        .then((r: any) => r)
    if (_err !== "")
        return res.status(400).json({ message: _err })
    if (user && user.Plans) {
        const Tables: IETable[] | undefined = user.Plans.find((plan: IEPlan) => plan._id == PlanId)!.Tables
        if (!Tables)
            return res.status(400).json({ message:"Table didn't create"})
        return res.status(201).json({ message: "Table created", id: Tables[Tables.length - 1]._id });
    }
    return res.status(500).json({ message: "something went wrong" });


}

export const recordTraining = async (req:Request,res:Response)=>{
    
}