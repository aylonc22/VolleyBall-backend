import { Request, Response } from "express";
import { Error } from "mongoose";
import { Exercise } from "../schema/exercise-schema";


export const addExercise = async (req: Request, res: Response) => {
    const body = req.body;
    if (!body)
        return res.status(400).json({ message: "Body is empty or missing " });
    const exercise = new Exercise(body);
    if (!exercise)
        return res.status(400).json({ message: "Body's parameters didn't match the criteria for creating an exercise in the data base" });
    exercise.save().then(()=>res.status(201).json({message:"Exercise added"})).catch((err:Error)=>res.status(500).json({message:err.message}))
}