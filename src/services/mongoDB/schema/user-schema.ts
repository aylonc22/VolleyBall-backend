import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        UserName: { type: String, required: true, unique: true },
        Name: { type: String, required: true },
        Password: { type: String, required: true },
        Picture: { type: String, required: true },
        Admin: { type: Boolean, required: true, default: false },
        Plans: {
            type: [{
                Name: { type: String, required: true },
                Tables:
                {
                    type: [{
                        Name: { type: String, required: true },
                        Exercises: {
                            type: [{
                                Uuid: { type: String, required: true },
                                Times: {
                                    type: [{
                                        Sets: {
                                            type: [{
                                                Weight: { type: Number, required: true },
                                                Reps: { type: Number, required: true },
                                            }],
                                            required: false,
                                        },
                                        Id: { type: String, required: true },
                                    }],
                                    requied: true,
                                },
                                Sets: { type: Number, required: true },
                                Reps: { type: Number, required: true },
                                Best: { type: Number, required: true },
                                Start: { type: Number, required: true },
                            }]
                        },
                        Dates: {
                            type: [{
                                Date: { type: Date, required: true },
                                Id: { type: String, required: true },
                            }], required: true,
                        },
                        Count: { type: Number, required: true, default: 0 }
                    }],
                    required: true,
                }
            }],
            required: true,
        },

    },
    { timestamps: true },
)

export const User = mongoose.model('user', UserSchema);