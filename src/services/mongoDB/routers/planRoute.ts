import { authenticateToken } from "../../authToken";
import { createPlan } from "../controllers/plan-ctrl";
import express from 'express'


const router = express.Router();
router.post('/createPlan',authenticateToken,createPlan);
// router.get('/user/:UserName/',authenticateToken,getUser);
// router.delete('/user',authenticateToken,deleteUser);

module.exports = router;