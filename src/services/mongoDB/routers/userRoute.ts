import { deleteUser, getUser, getUsers, insertUser } from "../controllers/user-ctrl";
import express,{Express} from 'express'


const router = express.Router();
router.post('/user',insertUser)
router.get('/user',getUsers);
router.get('/user/:UserName/:Password',getUser);
router.delete('/user',deleteUser);

module.exports = router;