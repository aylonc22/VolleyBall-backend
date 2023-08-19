import { authenticateToken } from "../../authToken";
import { deleteUser, getUser, getUsers } from "../controllers/user-ctrl";
import express from 'express'


const router = express.Router();
router.get('/user',getUsers);
router.get('/user/:UserName/',authenticateToken,getUser);
router.delete('/user',deleteUser);

module.exports = router;