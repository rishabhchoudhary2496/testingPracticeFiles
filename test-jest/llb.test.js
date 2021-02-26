const lib = require('./lib')

describe('absolute', () => {
  it('should return a positive number if input is positive', () => {
    const result = lib.absolute(1)
    expect(result).toBe(1)
  })

  it('should return a positive number if input is negative', () => {
    const result = lib.absolute(-1)
    expect(result).toBe(1)
  })

  it('should return a 0 if input is 0', () => {
    const result = lib.absolute(0)
    expect(result).toBe(0)
  })
})

describe('greet', () => {
  it('should return a greeting message', () => {
    expect(lib.greet('rishabh')).toMatch(/rishabh/)
  })
})

describe('getCurrencies', () => {
  it('should return supported currencies', () => {
    const result = lib.getCurrencies()
    expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']))
  })
})

describe('getProduct', () => {
  it('should return product with given id', () => {
    const result = lib.getProduct(1)
    expect(result).toMatchObject({ id: 1, price: 10 })
  })
})

describe('register User', () => {
  it('should throw if username is falsy', () => {
    const args = [null, undefined, NaN, 0, '', false]
    args.forEach((a) => {
      expect(() => {
        lib.registerUser(a)
      }).toThrow()
    })
  })

  it('should return user object if valid user name is passed', () => {
    const result = lib.registerUser('rishabh')
    expect(result).toMatchObject({ username: 'rishabh' })
    expect(result.id).toBeGreaterThan(0)
  })
})
