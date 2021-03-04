const postBlog = async (formDataJsonString) => {
  try {
    const result = await fetch('http://localhost:5000/', {
      method: 'POST',
      body: formDataJsonString,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })

    const data = await result.json()
    console.log(result.status)
    if (result.status == 200) {
      window.location.href = '/'
    } else {
      alert(data.message)
      window.location.reload()
    }
  } catch (error) {
    console.log(err)
    window.location.reload()
  }
}

window.onload = function () {
  const form = document.getElementById('createBlog')
  const pristine = new Pristine(form)

  form.addEventListener('submit', function (e) {
    e.preventDefault()
    // check if the form is valid

    const valid = pristine.validate() // returns true or false

    if (valid) {
      const formData = new FormData()
      for (let i = 0; i < form.length; i++) {
        formData.append(form[i].name, form[i].value)
      }
      formData.delete('')
      formData.delete('tags')
      const tagsValue = document.getElementById('tags').value
      const tagsArray = tagsValue.split(',')

      formData.append('tags', JSON.stringify(tagsArray))

      const plainFormData = Object.fromEntries(formData.entries())
      const formDataJsonString = JSON.stringify(plainFormData)
      console.log(plainFormData)
      //sending ajax request
      postBlog(formDataJsonString)
    }
  })
}
