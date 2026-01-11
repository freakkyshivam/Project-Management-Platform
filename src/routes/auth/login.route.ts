import express from "express"
import type { Router } from "express";
import { login } from "../../controllers/auth/login.controller.js";

const router : Router = express.Router();

router.post("/login", login)

export default router;