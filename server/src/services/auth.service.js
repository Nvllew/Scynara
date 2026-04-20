import { findUserByEmail, createUser } from '../models/user.model.js';
import { hashPassword , comparePassword} from '../utils/hash.js';
import { signToken } from '../utils/jwt.js';

export const loginUser = async ({ email, password }) => {

  if (!email || !password) {
    const err = new Error('Email y contraseña son requeridos');
    err.status = 400;
    throw err;
  }

  const user = await findUserByEmail(email);

  if (!user) {
    const err = new Error('Credenciales inválidas');
    err.status = 401;
    throw err;
  }

  if (!user.activo) {
    const err = new Error('Usuario inactivo');
    err.status = 403;
    throw err;
  }

  const isValid = await comparePassword(password, user.password);

  if (!isValid) {
    const err = new Error('Credenciales inválidas');
    err.status = 401;
    throw err;
  }

  const token = signToken({
    sub: user.id,
    email: user.email,
    rol: user.rol
  });

  return {
    user: {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol
    },
    token
  };
};

export const registerUser = async (data) => {
  const {
    nombre,
    apellidos,
    telefono,
    email,
    password,
    rol
  } = data;

  // Validaciones
  if (!nombre || !apellidos || !email || !password || !rol) {
    const err = new Error('Campos obligatorios faltantes');
    err.status = 400;
    throw err;
  }

  if (password.length < 8) {
    const err = new Error('La contraseña debe tener mínimo 8 caracteres');
    err.status = 400;
    throw err;
  }

  if (!['administrador', 'empleado'].includes(rol)) {
    const err = new Error('Rol inválido');
    err.status = 400;
    throw err;
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    const err = new Error('El correo ya está registrado');
    err.status = 409;
    throw err;
  }

  const passwordHash = await hashPassword(password);

  const newUser = await createUser({
    nombre,
    apellidos,
    telefono,
    email,
    password: passwordHash,
    rol
  });

  const token = signToken({
    sub: newUser.id,
    email: newUser.email,
    rol: newUser.rol
  });

  return {
    user: {
      id: newUser.id,
      nombre: newUser.nombre,
      email: newUser.email,
      rol: newUser.rol
    },
    token
  };
};