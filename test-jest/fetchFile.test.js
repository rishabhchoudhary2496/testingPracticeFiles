const fetchFile = require('./fetchFile')

test('fetch file is failing to get file', () => {
  expect(fetchFile).toThrow()
})
