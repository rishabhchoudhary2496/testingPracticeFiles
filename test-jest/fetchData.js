const fetchData = (callback) => {
  let data = 1
  setTimeout(() => {
    callback(data)
  }, 3000)
}

const fetchDataPromiseVersion = () => {
  return new Promise((resolve, reject) => {
    let data = 1
    setTimeout(() => {
      resolve(1)
    }, 3000)
  })
}

module.exports = { fetchData, fetchDataPromiseVersion }
