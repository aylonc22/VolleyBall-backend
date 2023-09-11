import { authenticateToken } from "../../authToken";
import { addExercise, editExercise, getExercises } from "../controllers/exersice-ctrl";
import express from 'express'


const router = express.Router();
router.post('/addExercise',authenticateToken,addExercise);
router.put('/editExercise',authenticateToken,editExercise);
router.get('/getExercises',authenticateToken,getExercises);

module.exports = router;