import { pool } from '../config/db.js';

export const findUserByEmail = async (email) => {
  const [rows] = await pool.query(
    'SELECT * FROM usuarios WHERE email = ? LIMIT 1',
    [email]
  );
  return rows[0] || null;
};

export const createUser = async (user) => {
  const {
    nombre,
    apellidos,
    telefono,
    email,
    password,
    rol
  } = user;

  const [result] = await pool.query(
    `INSERT INTO usuarios (nombre, apellidos, telefono, email, password, rol)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [nombre, apellidos, telefono, email, password, rol]
  );

  return {
    id: result.insertId,
    ...user
  };
};