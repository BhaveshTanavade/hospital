import express from "express";
import { authDoctor, registerDoctor } from "../controllers/doctor.controller.js";

const router = express.Router();

router.post("/register",registerDoctor);
router.post("/login", authDoctor);

export default router;