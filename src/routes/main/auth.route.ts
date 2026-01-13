import express from "express"
import type { Router } from "express";
import loginRoute from '../auth/login.route.js'
import registerRoute from '../auth/register.route.js'
const router : Router = express.Router();

router.use(loginRoute)
router.use(registerRoute)

export default router;