window.onload = function () {
  const readButtons = Array.from(document.querySelectorAll('#readBtn'))
  let blogId
  if (readButtons.length > 0) {
    readButtons.forEach(function (readBtn) {
      readBtn.addEventListener('click', function () {
        blogId = this.dataset.blogid
        window.location.href = `/${blogId}`
      })
    })
  }
}
