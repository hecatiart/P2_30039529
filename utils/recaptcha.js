const axios = require('axios');

async function validateRecaptcha(token) {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY; // Clave secreta en el .env
    const url = 'https://www.google.com/recaptcha/api/siteverify';

    try {
        const response = await axios.post(url, {}, {
            params: {
                secret: secretKey,
                response: token,
            },
        });

        console.log("Respuesta de Google reCAPTCHA:", response.data);

        if (!response.data.success) {
            console.error("Errores de reCAPTCHA:", response.data['error-codes']);
            throw new Error("Error en la validación de reCAPTCHA.");
        }

        return true; // Validación exitosa
    } catch (error) {
        console.error("Error al validar reCAPTCHA:", error.message);
        throw new Error("No se pudo verificar el reCAPTCHA.");
    }
}

module.exports = { validateRecaptcha };
