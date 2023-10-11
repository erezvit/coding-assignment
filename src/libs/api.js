const axios = require('axios').default;

const get = async (url, params, headers) => {
  if(!url) {
    throw new Error('Missing URL for an API request')
  }
  try {
    let config = { 
      url,
      method: 'get'
    }
    if(params) {
      config.params = params
    }
    if(headers) {
      config.headers = headers
    }
    const response = await axios(config)
    if(response.status != 200) {
      throw new Error(`API call returned with HTTP status ${response.status}`)
    }
    if(!response.data) {
      throw new Error(`API call returned without and data object`)
    }
    return response.data
  }
  catch (err) {
    throw new Error(`Error making an API call to URL ${url} - ${err.message || err}`)
  }
}

module.exports = {
  get
}