import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        UserName: { type : String, required: true },
        Name: { type : String, required: true },
        Password: { type : String, required: true },
        Picture:{type: String, required: true},
       
    },
    { timestamps: true },
)

export const User = mongoose.model('user', UserSchema);