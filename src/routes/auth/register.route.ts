import express from "express"
import type { Router } from "express";
import {signup, verifyOtp} from '../../controllers/auth/register.controller.js'

const router : Router = express.Router();

router.post("/register", signup)
router.post("/register/verify-otp", verifyOtp)

export default router;