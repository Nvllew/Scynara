import express from 'express';
import cors from 'cors';

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// ruta de prueba
app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

app.get("/productos", (req, res) => {
    res.json([{ id: 1, nombre: "Producto de prueba" }]);
  });
  
export default app;