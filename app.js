import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import doctorRoutes from "./routes/doctor.routes.js";
import patientRoutes from "./routes/patient.routes.js"

dotenv.config();

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/doctor", doctorRoutes);
app.use("/api/patient",patientRoutes);
