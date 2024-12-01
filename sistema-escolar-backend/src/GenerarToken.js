const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.JWT_SECRET;
const expiresIn = '1h';

if (!secretKey) {
  throw new Error("JWT_SECRET no está definido en el archivo .env");
}

function createToken(userData) {
  try {
    const token = jwt.sign(userData, secretKey, { expiresIn });
    return token;
  } catch (error) {
    console.error("Error al generar el token:", error);
    throw error;
  }
}

module.exports = { createToken };

