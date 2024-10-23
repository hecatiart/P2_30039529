var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Hola Mundo!',
    nombre: 'Edward David Quintero Santaella',
    cedula: 'V-30.039.529',
    seccion: 'Sección 4' 
  });
});

module.exports = router;
