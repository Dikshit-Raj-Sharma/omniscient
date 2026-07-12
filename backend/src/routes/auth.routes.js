import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db/index.js";
import { registerUser, loginUser } from "../controller/auth.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

export default router;
