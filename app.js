var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
const ContactosController = require('./controllers/contactoscontroller');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { default: axios } = require('axios');
const nodemailer = require('nodemailer');

var app = express();

require('dotenv').config();

// Motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/contacto', (req, res) => {
  res.render('contacto'); 
});

//Vistas y Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/', (req, res) => {
  res.render('contacto');
});



// Ruta para enviar el Formulario
app.post('/submit', (req, res) => ContactosController.add(req, res));
// Ruta para obtener los datos
app.get('/contacts', (req, res) => ContactosController.getAll(req, res));

// Error 404
app.use((req, res) => {
  console.log('Middleware 404 ejecutado');
  res.status(404).render('error', {
    pageTitle: 'Página no encontrada',
    errorMessage: 'La página que buscas no existe.',
  });
});

// Puerto
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = app;