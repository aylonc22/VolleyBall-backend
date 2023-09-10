import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema(
    {
        Uuid: { type : String, required: true, unique:true },
        Name: { type : String, required: true, unique:true },
        Video: { type : String, required: false },
        Description: { type : String, required: false  },


    },
    { timestamps: true },
)

export const Exercise = mongoose.model('exercise', ExerciseSchema);