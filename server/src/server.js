import app from './app.js';
import { pool } from './config/db.js';
import { env } from './config/env.js';

const startServer = async () => {
  try {
    const [rows] = await pool.query("SELECT 1");

    console.log("Conectado a MySQL correctamente");

    app.listen(env.PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${env.PORT}`);
    });

  } catch (error) {
    console.error("Error conectando a MySQL:", error);
    process.exit(1);
  }
};

startServer();