const timerGame = require('./timer')

describe('timerGame', () => {
  it('should wait 1 sec before the game', () => {
    jest.useFakeTimers()
    timerGame()
    expect(setTimeout).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000)
  })
})
