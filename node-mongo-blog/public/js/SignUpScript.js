const sendSignUpRequest = async (formData) => {
  try {
    const result = await fetch('http://localhost:5000/user/signup', {
      method: 'POST',
      body: formData,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })

    const data = await result.json()
    console.log(result.status)
    if (result.status == 200) {
      window.location.href = '/login'
    } else {
      alert(data.message)
      window.location.reload()
    }
  } catch (error) {
    console.log(err)
    window.location.reload()
  }
}

const form = document.getElementById('signUpForm')
const password = document.getElementById('password')
const confirmPassword = document.getElementById('confirmPassword')
const file = document.getElementById('file')
const pristine = new Pristine(form)
let imgFile
let imageUrl

pristine.addValidator(
  confirmPassword,
  function () {
    // here `this` refers to the respective input element
    if (this.value === password.value) {
      return true
    }
    return false
  },
  "Password doesn't match",
  false
)

file.addEventListener('change', (e) => {
  const previewImg = document.getElementById('previewImg')
  imgFile = e.currentTarget.files[0]
  imageUrl = URL.createObjectURL(imgFile)
  console.log(imageUrl)
  previewImg.height = 200
  previewImg.width = 200
  previewImg.src = imageUrl
})

form.addEventListener('submit', function (e) {
  e.preventDefault()
  // check if the form is valid
  if (!imgFile) {
    return alert('Please Upload Photo')
  }
  const valid = pristine.validate() // returns true or false
  if (valid) {
    const formData = new FormData()
    for (let i = 0; i < form.length; i++) {
      formData.append(form[i].name, form[i].value)
    }
    console.log('imgFile', imgFile)
    formData.delete('')
    formData.delete('confirmPassword')
    formData.append('profilePic', imgFile)

    const plainFormData = Object.fromEntries(formData.entries())

    console.log(plainFormData)
    //sending ajax request
    sendSignUpRequest(formData)
  }
})
