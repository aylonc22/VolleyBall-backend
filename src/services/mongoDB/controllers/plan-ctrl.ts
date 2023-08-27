import { Request, Response } from "express";
import { User } from "../schema/user-schema";
import { Error } from "mongoose";
import { IEUser } from "../../../models/express-model";

export const createPlan = async (req:Request,res:Response)=>{
    const {PlanName}= req.body;
    if(!PlanName)
        return res.status(400).json({message:"Body is empty, plane name is required!"});
    const UserName:String = req.user.UserName;  
    const user:IEUser = await User.findOneAndUpdate({UserName:UserName},{$push:{Plans:{Name:PlanName}}},{returnOriginal:false})
    .catch((err:Error)=>res.status(400).json({message:err.message}))
    .then((r:any)=>r)
    if(user)
        return res.status(201).json({message:"Plan created",id:user.Plans?user.Plans[user.Plans.length-1]._id:undefined});
    return res.status(500).json({message:"something went wrong"});
    
}