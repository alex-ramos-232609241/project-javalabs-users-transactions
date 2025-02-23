const axios = require('axios');

function InstanceAxios(urlBaseService, keyService){

    return axios.create({
        baseURL: urlBaseService,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Api-Key ${keyService}`
        }
      });
}

module.exports = {
    InstanceAxios
}
