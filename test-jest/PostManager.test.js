const PostManager = require('./PostManager')
const PostClient = require('./PostClient')

jest.mock('./PostClient')

describe('PostManager', () => {
  it('should return the post to the given id', async () => {
    const expectedResult = {
      userId: 4,
      id: 35,
      title: 'id nihil consequatur molestias animi provident',
      body:
        'nisi error delectus possimus ut eligendi vitae\nplaceat eos harum cupiditate facilis reprehenderit voluptatem beatae\nmodi ducimus quo illum voluptas eligendi\net nobis quia fugit',
    }

    const mockGetById = jest.fn()
    PostClient.prototype.getById = mockGetById
    mockGetById.mockReturnValue(Promise.resolve(expectedResult))

    const postManager = new PostManager()
    const result = await postManager.getPostToManage(35)
    expect(result.id).toBe(35)
  })
})
