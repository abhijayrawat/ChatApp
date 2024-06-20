import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUserForSide } from "../controllers/user.controller.js";
const router=express.Router();

router.get("/",protectRoute,getUserForSide)

export default router;