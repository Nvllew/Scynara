import express from "express";
import cors from "cors";

import productoRoutes from "./routes/producto.routes.js";
import qrRoutes from "./routes/qr.routes.js";
import authRoutes from './routes/auth.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// rutas
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

app.use("/productos", productoRoutes);
app.use("/qr", qrRoutes);

app.use('/auth', authRoutes);

app.use(errorHandler);

export default app;