import express from 'express';
import * as dotenv from 'dotenv';

import userSignup from '../controllers/userController.js'

dotenv.config();

const router = express.Router();

router.route("/signup").post(userSignup);

export default router;