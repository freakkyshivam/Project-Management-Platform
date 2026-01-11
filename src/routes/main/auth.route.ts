import express from "express"
import type { Router } from "express";
import loginRoute from '../auth/login.route.js'

const router : Router = express.Router();

router.use(loginRoute)

export default router;