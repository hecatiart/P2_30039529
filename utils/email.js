const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  }
});

async function sendEmail(data) {
  const { name, email, comment, ip, country, fecha } = data;

  const mailOptions = {
    from: 'dwrdxiv@gmail.com', 
    to: ['adjfb.ed@gmail.com', 'programacion2ais@dispostable.com'], 
    subject: '[TutoriasSJM] Nuevo Formulario', 
    text: `Se ha recibido un nuevo mensaje en el formulario de contacto:
    
    Nombre: ${name}
    Correo: ${email}
    Comentario: ${comment}
    IP: ${ip}
    País: ${country}
    Fecha/Hora: ${fecha}
    `, // Cuerpo del mensaje en formato texto
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado con éxito');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
}

module.exports = { sendEmail };
