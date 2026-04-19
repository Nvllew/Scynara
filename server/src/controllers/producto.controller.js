import { productos } from "../data/productos.js";

export const getProductos = (req, res) => {
  res.json(productos);
};