const sum = require('./sum')

test('add 1+2 equals to 3', () => {
  expect(sum(2, 2)).toBeGreaterThan(3)
  expect(sum(2, 2)).toBeGreaterThanOrEqual(3.5)
  expect(sum(2, 2)).toBeLessThan(5)
  expect(sum(2, 2)).toBeLessThanOrEqual(4.5)
})

test('object assignment', () => {
  const data = { one: 1 }
  data['two'] = 2
  expect(data).toEqual({ one: 1, two: 2 })
})

test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0)
    }
  }
})

test('null', () => {
  const n = null
  expect(n).toBeNull()
  expect(n).toBeDefined()
  expect(n).not.toBeUndefined()
  expect(n).not.toBeTruthy()
  expect(n).toBeFalsy()
})

test('zero', () => {
  const z = 0
  expect(z).not.toBeNull()
  expect(z).toBeDefined()
  expect(z).not.toBeUndefined()
  expect(z).not.toBeTruthy()
  expect(z).toBeFalsy()
})

test('testing floating point', () => {
  const value = 0.1 + 0.2
  expect(value).toBeCloseTo(0.3)
})

test('testing strings', () => {
  const sentence = 'A brown fox jumps over a lazy dog'
  expect(sentence).toMatch(/fox/)
})

test('array and iterables', () => {
  const superHeroes = ['BatMan', 'SuperMan', 'IronMan']
  expect(superHeroes).toContain('IronMan')
})
