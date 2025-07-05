import { Router } from 'express';
import { signUp } from '../controllers/users.controller.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { userSchema } from '../schemas/user.schema.js';

const router = Router();

router.post('/', validateSchema(userSchema), signUp);

export default router;
