import { productos } from "../data/productos.js";

export const scanQR = (req, res) => {
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
};