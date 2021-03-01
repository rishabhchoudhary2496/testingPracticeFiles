const axios = require('axios')
const getUsersList = require('./users')

jest.mock('axios')

//mocking resolved values

describe('getUsersList', () => {
  it('should return array of users objects', () => {
    const users = [
      {
        id: 10,
        name: 'Clementina DuBuque',
        username: 'Moriah.Stanton',
        email: 'Rey.Padberg@karina.biz',
      },
    ]

    const response = { data: users }
    axios.get.mockResolvedValue(response)
    getUsersList().then((data) => expect(data).toEqual(users))
  })
})
