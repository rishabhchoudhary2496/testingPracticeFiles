const { fetchData, fetchDataPromiseVersion } = require('./fetchData')

//testing asychronous code
//testing callback function
test('the data is id', (done) => {
  function callback(data) {
    try {
      expect(data).toBe(1)
      done()
    } catch (error) {
      done(error)
    }
  }
  fetchData(callback)
})

//testing promises
test('data should be 1 or should no data', () => {
  return fetchDataPromiseVersion()
    .then((data) => {
      expect(data).toBe(1)
    })
    .catch((e) => expect(e).toMatch('no data'))
})

//async await
test('data should be 1', async () => {
  const data = await fetchDataPromiseVersion()
  expect(data).toBe(1)
})
