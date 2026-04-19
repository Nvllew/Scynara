import express from "express";
import { getProductos } from "../controllers/producto.controller.js";

const router = express.Router();

router.get("/", getProductos);

export default router;