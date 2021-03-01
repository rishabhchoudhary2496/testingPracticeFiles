const forEach = require('./mock')

describe('testing a mock functions', () => {
  it('should returns parameters passed to a function', () => {
    const mockCallback = jest.fn((x) => x + 42)
    forEach([0, 1], mockCallback)
    expect(mockCallback.mock.calls.length).toBe(2)
    expect(mockCallback.mock.results[0].value).toBe(42)
  })
})
