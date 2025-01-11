const axios = require('axios');

//API Geolocalizacion
async function getGeolocation(ip) {
  const apiKey = process.env.IP_API_KEY; // Usa variables de entorno para la clave de la API
  const url = `https://ipapi.co/${ip}/json/?key=${apiKey}`;
  
  try {
    const response = await axios.get(url);
    return response.data.country_name; // Devuelve el país
  } catch (error) {
    console.error('Error al obtener la geolocalización:', error);
    return 'Desconocido';
  }
}

module.exports = getGeolocation;