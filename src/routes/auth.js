import express from "express";
import { login, register } from "../controllers/auth.js";

const router = express.Router();

// @/api/v1/auth/
router.post("/register", register);
router.post("/login", login);

export default router;
