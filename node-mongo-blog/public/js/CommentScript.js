const postComment = async (blogId, formDataJsonString) => {
  try {
    const result = await fetch(`http://localhost:5000/comment/${blogId}`, {
      method: 'POST',
      body: formDataJsonString,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })

    const data = await result.json()
    if (result.status == 200) {
      window.location.reload()
    } else {
      alert(data.message)
      window.location.reload()
    }
  } catch (error) {
    console.log(err)
    window.location.reload()
  }
}

const deleteComment = async (id) => {
  try {
    const result = await fetch(`http://localhost:5000/comment/${id}`, {
      method: 'DELETE',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })

    const data = await result.json()
    console.log(result)
    if (result.status == 200) {
      window.location.reload()
    } else {
      alert(data.message)
      window.location.reload()
    }
  } catch (error) {
    console.log(err)
    window.location.reload()
  }
}

const updateComment = async (id, formDataJsonString) => {
  try {
    const result = await fetch(`http://localhost:5000/comment/${id}`, {
      method: 'PUT',
      body: formDataJsonString,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })

    const data = await result.json()
    if (result.status == 200) {
      window.location.reload()
    } else {
      alert(data.message)
      window.location.reload()
    }
  } catch (error) {
    console.log(err)
    window.location.reload()
  }
}

const editIcons = Array.from(document.querySelectorAll('#editCommentIcon'))

if (editIcons.length > 0) {
  editIcons.forEach(function (editIcon) {
    editIcon.addEventListener('click', function () {
      const childNodes = Array.from(editIcon.parentNode.children)
      console.log(childNodes)
      const updateCommentBox = childNodes[1]
      updateCommentBox.classList.toggle('hideElement')
      const comment = childNodes[2]
      let commentText = comment.innerText
      comment.classList.toggle('hideElement')
      const editTextArea = updateCommentBox.children[0]
      editTextArea.value = commentText
    })
  })
}

const updateCommentButtons = Array.from(
  document.querySelectorAll('#updateCommentBtn')
)

if (updateCommentButtons.length > 0) {
  updateCommentButtons.forEach(function (updateCommentButton) {
    updateCommentButton.addEventListener('click', function () {
      console.log(updateCommentButton.parentNode.children)
      const editTextAreaValue = updateCommentButton.parentNode.children[0].value
      const id = updateCommentButton.dataset.commentid
      if (!editTextAreaValue) {
        alert('comment required')
      }
      console.log('update comment', editTextAreaValue, id)
      const formData = new FormData()
      formData.append('commentText', editTextAreaValue)
      const plainFormData = Object.fromEntries(formData.entries())
      const formDataJsonString = JSON.stringify(plainFormData)
      updateComment(id, formDataJsonString)
    })
  })
}

const trashButtons = Array.from(document.querySelectorAll('#trashBtn'))
if (trashButtons.length > 0) {
  trashButtons.forEach(function (trashButton) {
    trashButton.addEventListener('click', function () {
      deleteComment(trashButton.dataset.commentid)
    })
  })
}

const form = document.getElementById('comment-form')

const pristine = new Pristine(form)

form.addEventListener('submit', function (e) {
  //slicing / from id
  e.preventDefault()
  const blogId = window.location.pathname.slice(1)
  console.log('blogId')
  const valid = pristine.validate()
  if (valid) {
    const formData = new FormData()
    for (let i = 0; i < form.length; i++) {
      formData.append(form[i].name, form[i].value)
    }
    formData.delete('')

    const plainFormData = Object.fromEntries(formData.entries())
    const formDataJsonString = JSON.stringify(plainFormData)
    postComment(blogId, formDataJsonString)
  }
})
