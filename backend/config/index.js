const axios = require('axios');

module.exports = {
  //API call to rebuild the back and front in DigitalOcean
  async rebuildDOApp(param) {
    try {
      await axios.post(
        process.env.DO_APP_API_ENDPOINT,
        {
          force_build: true
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.DO_APP_API_TOKEN}`
          }
        })
    } catch(e) {
      console.error(e)
    }
  },
};