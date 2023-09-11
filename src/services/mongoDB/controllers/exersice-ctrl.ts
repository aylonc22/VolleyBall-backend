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
    exercise.save().then(() => res.status(201).json({ message: "Exercise added" })).catch((err: Error) => res.status(500).json({ message: err.message }))
}

export const editExercise = async (req: Request, res: Response) => {
    const body = req.body;
    if (!body)
        return res.status(400).json({ message: "Body is empty or missing" });

    if (!body.id || !body.Uuid || !body.Name || !body.Video || !body.Description)
        return res.status(400).json({ message: "Body's parameters didn't match the criteria for creating an exercise in the data base" });
    Exercise.findOneAndUpdate({ _id: body.id }, { Uuid: body.Uuid, Name: body.Name, Video: body.Video, Description: body.Description }).then(r => res.status(200).json({ message: "Exercise changed" }))
        .catch((err: Error) => res.status(500).json({ message: err.message }));
}

export const getExercises =async (req: Request, res: Response) => {
    Exercise.find().then(r=>res.status(200).json({message:"Succeed",exercises:r}))
    .catch((err:Error)=>res.status(500).json({message:"Something went wrong"}));
}