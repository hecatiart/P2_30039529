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

    // Método para manejar la solicitud y guardar los datos
    async add(req, res) {
        try {
            console.log("Datos recibidos:", req.body);
            const {name, email, comment} = req.body
            console.log(req.body);
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
