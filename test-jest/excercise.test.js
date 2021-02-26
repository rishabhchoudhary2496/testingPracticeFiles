const { fizzBuzz } = require('./excercise')

describe('fizzBuzz', () => {
  it('Should throw an exception if input is not a number', () => {
    const args = ['1', 'a', null, undefined]
    args.forEach((a) => {
      expect(() => {
        fizzBuzz(a)
      }).toThrow()
    })
  })

  it('Should return FizzBuzz if divisible by both 3 and 5', () => {
    const result = fizzBuzz(15)
    expect(result).toBe('FizzBuzz')
  })

  it('Should return Fizz if divisible by 3 ', () => {
    const result = fizzBuzz(9)
    expect(result).toBe('Fizz')
  })

  it('Should return Buzz if divisible by 5', () => {
    const result = fizzBuzz(20)
    expect(result).toBe('Buzz')
  })

  it('Should return input if neither divisible by 3 and 5', () => {
    const result = fizzBuzz(16)
    expect(result).toBe(16)
  })
})
