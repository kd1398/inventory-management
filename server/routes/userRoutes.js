import express from "express";
import * as dotenv from "dotenv";

import { signUp, login } from "../controllers/userController.js";

dotenv.config();

const router = express.Router();

router.route("/signup").post(signUp);
router.route("/login").post(login);

export default router;
