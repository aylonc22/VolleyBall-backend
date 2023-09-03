export interface IUser {
    UserName: String,
    Name: String,
    Password: String,
    Picture: String,
    Admin?: Boolean,
    Plans?: IPlan[],

}

export interface IToken {
    Token: String,
}

export interface IPlan {
    Name: String,
    Tables: ITable[],
}

export interface ITable {
    Name: String,
    Exercises: IExercise[],
    Dates: IDate[],
    Count:number,
}

export interface IDate {
    Date: Date,
    Id: String,
}

export interface IExercise {
    Name: String,
    Times: ITime[],
    Sets: Number,
    Reps: Number,
    Best: Number,
    Start: Number,
}

export interface ITime {
    Sets: ISet[],
    Id: String,
}

export interface ISet {
    Weight:Number,
    Reps:Number,
}