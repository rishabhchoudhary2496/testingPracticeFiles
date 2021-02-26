module.exports.absolute = function (number) {
  return number >= 0 ? number : -number
}

module.exports.greet = function (name) {
  return `Welcome ${name}`
}

//testing array
module.exports.getCurrencies = function () {
  return ['USD', 'AUD', 'EUR']
}

// Testing objects
module.exports.getProduct = function (productId) {
  return { id: productId, price: 10, name: 'Soap' }
}

// Testing exceptions
module.exports.registerUser = function (username) {
  if (!username) throw new Error('Username is required.')

  return { id: new Date().getTime(), username: username }
}
