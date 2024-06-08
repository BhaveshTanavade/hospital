import express from "express";
import { registerPatient } from "../controllers/patient.controller.js";
import { auth } from "../middlewares/JWTauth.js";
import { createReport, getAllReport, getReportsByStatus } from "../controllers/report.controller.js";

const router = express.Router();

router.post("/register", registerPatient);
router.post("/create_report/:id",auth , createReport);
router.get("/all_reports/:id",auth, getAllReport);
router.get("/report/:status", auth, getReportsByStatus)

export default router;