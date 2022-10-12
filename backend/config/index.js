const axios = require('axios');

module.exports = {
  //API call to rebuild the back and front in DigitalOcean
  async rebuildDOApp(param) {
    try {
      await axios(process.env.DO_APP_API_ENDPOINT, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DO_APP_API_TOKEN}`
        },
        body: JSON.stringify({force_build: true})
      })
    } catch(e) {
      console.error(e)
    }
  },
};