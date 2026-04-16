import api from "./api";

export const getProductos = async () => {
  const res = await api.get("/productos");
  return res.data;
};