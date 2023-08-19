import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TokenSchema = new Schema(
    {
        Token: { type : String, required: true, unique:true },          
    },
    { timestamps: true },
)

export const Token = mongoose.model('token', TokenSchema);