import { ObjectId } from "mongoose";

export interface IAUser {
        UserName:string,
        Name:string,
        Admin:Boolean,
        iat:number,
        exp:number,
}

export interface IEUser {
        _id:ObjectId,
        UserName: String,
        Name: String,
        Password: String,
        Picture: String,
        Admin: Boolean,
        Plans?: IEPlan[],
        createdAt:NativeDate,
        updatedAt:NativeDate,
        __v:number,
    
    }
        
    export interface IEPlan {
        _id:ObjectId,
        Name: String,
        Tables: IETable[],
    }
    
    export interface IETable {
        _id:ObjectId,
        Name: String,
        Exercises: IEExercise[],
        Dates: IEDate[],
        Count: number,
    }
    
    export interface IEDate {
        Date: Date,
        Id: String,
    }
    
    export interface IEExercise {
        Uuid: String,
        Times: IETime[],
        Sets: Number,
        Reps: Number,
        Best: Number,
        Start: Number,
    }
    
    export interface IETime {
        Sets: IESet[],
        Id: String,
    }
    
    export interface IESet {
        Weight:Number,
        Reps:Number,
    }