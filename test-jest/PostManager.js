const PostClient = require('./PostClient')

class PostManager {
  async getPostToManage(id) {
    const postClient = new PostClient()
    const postToManage = await postClient.getById(id).catch((err) => alert(err))
    return postToManage
  }
}

module.exports = PostManager
