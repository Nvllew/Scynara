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
  
const productos = [
  { codigo: "758104100422", nombre: "Bonafont", precio: 18, stock: 25 }
];

app.post("/api/qr", (req, res) => {
  try {
    const { qr } = req.body;

    console.log("QR recibido:", qr);

    const producto = productos.find(p => p.codigo === qr);

    if (!producto) {
      return res.status(404).json({
        mensaje: "Producto no encontrado"
      });
    }

    res.json({
      mensaje: "Producto encontrado",
      producto
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error en el servidor"
    });
  }
});

export default app;