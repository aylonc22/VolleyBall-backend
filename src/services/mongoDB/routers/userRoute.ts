import { authenticateToken } from "../../authToken";
import { deleteUser, getUser, getUsers } from "../controllers/user-ctrl";
import express from 'express'


const router = express.Router();
router.get('/user',authenticateToken,getUsers);
router.get('/user/:UserName/',authenticateToken,getUser);
router.delete('/user',authenticateToken,deleteUser);

module.exports = router;