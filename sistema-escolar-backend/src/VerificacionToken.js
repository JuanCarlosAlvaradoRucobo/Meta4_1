import { OAuth2Client } from 'google-auth-library';

const GOOGLE_CLIENT_ID = "453365147539-lu4djoosnqbm62vtjtgq9cgbgve7q1cb.apps.googleusercontent.com";

// Función para inicializar el cliente OAuth2
async function VerificacionToken(clientId) {
  try {
    if (!clientId) {
      throw new Error('El GOOGLE_CLIENT_ID no está definido.');
    }

    const client = new OAuth2Client(clientId);

    return {
      verify: async (token) => {
        try {
          if (!token) {
            throw new Error('Token no proporcionado');
          }

          const ticket = await client.verifyIdToken({
            idToken: token,
            audience: clientId, // Validar que el token fue emitido para este cliente
          });

          const payload = ticket.getPayload();

          // Validar dominio (opcional, por ejemplo: correos institucionales)
          if (payload.hd && payload.hd !== 'uabc.edu.mx') {
            throw new Error('Dominio de correo no autorizado');
          }

          return {
            success: true,
            payload,
            userId: payload.sub,
            email: payload.email,
            name: payload.name,
            picture: payload.picture,
            domain: payload.hd,
          };
        } catch (error) {
          console.error('Error en la verificación del token:', error);
          return {
            success: false,
            error: error.message,
            errorCode: error.code || 'VERIFICATION_FAILED',
          };
        }
      },
    };
  } catch (error) {
    console.error('Error al inicializar el verificador de tokens:', error);
    throw error;
  }
}

// Middleware para verificar tokens
export const verificarGoogleToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: 'Token no proporcionado',
      });
    }

    // Extraer el token del header (formato: "Bearer TOKEN")
    const token = authHeader.split(' ')[1];
    const verificador = await VerificacionToken(GOOGLE_CLIENT_ID);
    const resultado = await verificador.verify(token);

    if (!resultado.success) {
      return res.status(401).json(resultado);
    }

    // Agregar la información del usuario verificada al objeto request
    req.usuario = {
      googleId: resultado.userId,
      email: resultado.email,
      nombre: resultado.name,
      foto: resultado.picture,
      dominio: resultado.domain,
    };

    next();
  } catch (error) {
    console.error('Error en el middleware de verificación:', error);
    res.status(500).json({
      success: false,
      error: 'Error en la verificación del token',
      details: error.message,
    });
  }
};

export default VerificacionToken;