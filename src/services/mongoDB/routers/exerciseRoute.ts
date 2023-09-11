import { authenticateToken } from "../../authToken";
import { addExercise, editExercise } from "../controllers/exersice-ctrl";
import express from 'express'


const router = express.Router();
router.post('/addExercise',authenticateToken,addExercise);
router.put('/editExercise',authenticateToken,editExercise);


module.exports = router;