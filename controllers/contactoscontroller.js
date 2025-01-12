const ContactosModel = require('../models/contactosmodel');
const getGeolocation = require('../utils/geolocation');


class ContactosController {
    constructor() {
        this.model = new ContactosModel();
    }

    // Método para validar los datos
    validateData(data) {
        const { name, email, comment} = data;
        if (!name || !email || !comment) {
            throw new Error('Todos los campos son obligatorios.');
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            throw new Error('El correo electrónico no es válido.');
        }
    }

      
    // Método para validar reCAPTCHA
    async validateRecaptcha(token) {
        const secretKey = process.env.RECAPTCHA_SECRET_KEY; // Asegúrate de que la clave esté en tu .env
        console.log("Clave Secreta Google:", process.env.RECAPTCHA_SECRET_KEY);
        //const url = 'https://www.google.com/recaptcha/api/siteverify';
        const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
        
        try {
            const response = await axios.post(url, {}, {
                params: {
                    secret: secretKey,
                    response: token,
                },
            });
            console.log('Respuesta de Google:', response.data);

            if (!response.data.success) {
                throw new Error('Error en la validación de reCAPTCHA.');
            }
        } catch (error) {
            throw new Error('No se pudo verificar el reCAPTCHA.');
        }
    }   

    // Método para manejar la solicitud y guardar los datos
    async add(req, res) {
        try {
            console.log("Datos recibidos:", req.body);
            console.log("Token de reCAPTCHA recibido:", req.body['g-recaptcha-response']);
            const {name, email, comment, recaptchaToken} = req.body;
            
            //Validar Captcha
            await this.validateRecaptcha(recaptchaToken);

            // Validar datos
            this.validateData({name, email, comment});

            // Agregar IP y fecha
            const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
            const fecha = new Date().toISOString();
            const country = await getGeolocation(ip);

            console.log("IP:", ip);
            console.log("fecha:", fecha);
            console.log('Pais:', country);
            
            // Guardar en la base de datos
            const result = await this.model.saveContact({
                name,
                email,
                comment,
                ip,
                country,
                fecha,
            });

            // Redireccionar o mostrar mensaje de éxito
            res.send(result);
        } catch (error) {
            console.log("Error:", error.message);
            res.status(400).send(`Error: ${error.message}`);
        }
    }

    // Método para recuperar todos los contactos
    async getAll(req, res) {
        try {
            const contacts = await this.model.getAllContacts();
            res.json(contacts);
        } catch (error) {
            res.status(500).send(`Error: ${error.message}`);
        }
    }
}

module.exports = new ContactosController();
