import express from "express";
import { scanQR } from "../controllers/qr.controller.js";

const router = express.Router();

router.post("/", scanQR);

export default router;