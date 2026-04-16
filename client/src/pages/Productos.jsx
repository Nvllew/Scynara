import { useEffect } from "react";
import { getProductos } from "../services/productosService";

function Productos() {
  useEffect(() => {
    getProductos()
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }, []);

  return <h1>Productos 📦</h1>;
}

export default Productos;