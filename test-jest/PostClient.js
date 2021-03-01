const axios = require('axios')

class PostClient {
  async getById(id) {
    const url = `https://jsonplaceholder.typicode.com/posts/${id}`
    const response = await axios.get(url)
    return response.data
  }
}

module.exports = PostClient
