const FullName = require('./fullName')

test('return full Name', () => {
  expect(FullName('john', 'Doe')).toBe('john Doe')
})

//testing asynchronous code
