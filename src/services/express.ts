import axios from 'axios';
import express, { Express, Request, Response } from 'express';



export const initExpress = ()=>{       
    const app:Express = express();   
    //const cors = require('cors');
    
    //app.use(cors());
    app.use(express.json());      
    app.listen(process.env.PORT,()=>console.log("[Server] is running..."));
    
    const userRoute = require('./mongoDB/routers/userRoute');
    app.use(userRoute);
    // rest_riot api request start with /api
   // initRA(app)
    // data base api request start with /db
    //initDA(app);
         
    
    return app;
   
};
 
