const axios = require('axios');

//API Geolocalizacion
async function getGeolocation() {
    try {
        // Obtén la IP pública automáticamente
        const response = await axios.get(`http://api.ipstack.com/check?access_key=${process.env.IPSTACK_API_KEY}`);
        const country = response.data.country_name;
        console.log('IpStack pais:', country);
        return country;
    } catch (error) {
        console.error('Error al obtener la geolocalización:', error);
    }
}


module.exports = getGeolocation;