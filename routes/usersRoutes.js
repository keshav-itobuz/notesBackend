import { registerUser, loginUser } from '../controllers/usersController.js';
import { Router } from 'express';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
