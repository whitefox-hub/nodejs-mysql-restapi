import { Router } from 'express';
import {getUsers, createUser, getUser, updateUser, deleteUser} from '../controllers/UserController.js';

const router = Router();

router.get('/users', getUsers);
router.post('/user', createUser);
router.get('/user/:id', getUser);
router.patch('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

export default router;
