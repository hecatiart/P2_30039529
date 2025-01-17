# Tutorias SJM
Proyecto Web para Asesorias y Tutorias a domicilio

## Contenidos
- [Instalacion](#instalacion)
- [Caracteristicas](#caracteristicas)
- [Configuracion](#configuracion)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)

## Instalacion
1. Clona este repositorio
2. Instala las dependencias Necesarias
3. Crea un archivo .env con las variables que explicaré a continuacion
4. Inicia el servidor (npm start)

## Caracteristicas
- Formulario de Contacto con Validacion de Google reCAPTCHA
- Geolocalizacion automatica por IP
- Envio de notificacioens por correo electronico
- Registro de pais, ip y fecha de envio del formulario
- Mapa integrado por Google Maps
- Integracion con Google Analytics

## Configuracion
### Variables de Entorno
- RECAPTCHA_SECRET_KEY=clave_secreta_de_recaptcha
- EMAIL_USER=tu_correo@gmail.com
- EMAIL_PASS=tu_contraseña
- IP_API_KEY=tu_clave_de_ipstack

### Apis Externas
- Google reCAPTCHA
- Nodemailer
- IPStack

## Tecnologias Utilizadas
- Node.js
- Express.js
- Nodemailer
- Axios
- Dotenv
- Google reCAPTCHA
- IPStack
