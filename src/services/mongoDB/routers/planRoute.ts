import { authenticateToken } from "../../authToken";
import { createPlan, createTable } from "../controllers/plan-ctrl";
import express from 'express'


const router = express.Router();
router.post('/createPlan',authenticateToken,createPlan);
router.post('/createTable',authenticateToken,createTable);
// router.delete('/user',authenticateToken,deleteUser);

module.exports = router;