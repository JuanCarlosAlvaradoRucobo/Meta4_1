import express from 'express';
const router = express.Router();
import { verificarGoogleToken } from '../VerificacionToken.js';
const GOOGLE_CLIENT_ID = "453365147539-lu4djoosnqbm62vtjtgq9cgbgve7q1cb.apps.googleusercontent.com";
router.post('/google', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        // Verificar el token y obtener la información del usuario
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        
        const payload = ticket.getPayload();
        
        // Responder con la información del usuario
        res.json({
            success: true,
            user: {
                id: payload.sub,
                email: payload.email,
                name: payload.name,
                picture: payload.picture
            }
        });
    } catch (error) {
        console.error('Error en autenticación:', error);
        res.status(401).json({
            success: false,
            message: 'Error en la autenticación'
        });
    }
});

export default router;