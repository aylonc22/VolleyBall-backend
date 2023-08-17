import { MongooseError } from "mongoose";
import * as dotenv from 'dotenv';
dotenv.config();

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose
  .connect(
    `mongodb+srv://aylonc:${process.env.MONGO}@volleyball.rp3hl72.mongodb.net/`
  )
  .catch((e:MongooseError|Error) => {
    console.error('[Mongo] Connection error ', e.message);
  });

export const db = mongoose.connection;

