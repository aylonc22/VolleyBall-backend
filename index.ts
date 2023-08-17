import { initExpress } from "./src/services/express";

import { db } from "./src/services/mongoDB/mongoConnection";
import * as dotenv from 'dotenv';
dotenv.config();

const app = initExpress();

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open',()=>{
    console.log("[Mongo] database connection established successfully");
});