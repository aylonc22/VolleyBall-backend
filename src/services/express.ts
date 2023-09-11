import axios from 'axios';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';



export const initExpress = ()=>{       
    const app:Express = express();   
    //const cors = require('cors');
    
    app.use(cors());
    app.use(express.json());      
    app.listen(process.env.PORT,()=>console.log(`[Server] is running on port ${process.env.PORT}`));
    
    const userRoute = require('./mongoDB/routers/userRoute');
    const planRoute = require('./mongoDB/routers/planRoute');
    const exerciseRoute = require('./mongoDB/routers/exerciseRoute');
    app.use(userRoute,planRoute,exerciseRoute);
    // rest_riot api request start with /api
   // initRA(app)
    // data base api request start with /db
    //initDA(app);
         
    
    return app;
   
};
 
