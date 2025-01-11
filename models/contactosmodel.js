const sqlite3 = require('sqlite3').verbose();

class ContactosModel {
    constructor() {
        this.db = new sqlite3.Database('./contactos.db', (err) => {
            if (err) {
                console.error('Error al conectar con SQLite3:', err.message);
            } else {
                console.log('Conexión exitosa a SQLite3.');
            }
        });
        this.initializeTable();
    }

    // Crea la tabla si no existe
    initializeTable() {
        const query = `
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                comment TEXT NOT NULL,
                ip TEXT NOT NULL,
                country TEXT NOT NULL,
                fecha TEXT NOT NULL
            )
        `;
        this.db.run(query, (err) => {
            if (err) {
                console.error('Error al crear la tabla:', err.message);
            }
        });
    }

    // Guardar datos en la tabla
    saveContact(data) {
        const { name, email, comment, ip, country, fecha } = data;
        const query = `
            INSERT INTO users (name, email, comment, ip, country, fecha)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        return new Promise((resolve, reject) => {
            this.db.run(query, [name, email, comment, ip, country, fecha], (err) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve('Datos guardados con éxito.');
                }
            });
        });
    }

    // Recuperar todos los contactos
    getAllContacts() {
        return new Promise((resolve, reject) => {
            this.db.all('SELECT * FROM users', (err, rows) => {
                if (err) {
                    reject(err.message);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}

module.exports = ContactosModel;
