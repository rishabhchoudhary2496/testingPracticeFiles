const postReply = async (formDataJsonString) => {
  try {
    const result = await fetch('http://localhost:5000/reply', {
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
      alert(data)
      window.location.reload()
    }
  } catch (error) {
    console.log(err)
    window.location.reload()
  }
}

const deleteReply = async (id) => {
  try {
    const result = await fetch(`http://localhost:5000/reply/${id}`, {
      method: 'DELETE',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    })

    const data = await result.json()
    if (result.status == 200) {
      window.location.reload()
    } else {
      alert(data)
      window.location.reload()
    }
  } catch (error) {
    console.log(err)
    window.location.reload()
  }
}

const updateReply = async (id, formDataJsonString) => {
  try {
    const result = await fetch(`http://localhost:5000/reply/${id}`, {
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

const replyTrashButtons = Array.from(
  document.querySelectorAll('#replyTrashBtn')
)

console.log('replyTrashButtons', replyTrashButtons)
if (replyTrashButtons.length > 0) {
  replyTrashButtons.forEach(function (replyTrashButton) {
    replyTrashButton.addEventListener('click', function () {
      deleteReply(replyTrashButton.dataset.replyid)
    })
  })
}

const editReplyIcons = document.querySelectorAll('#editReplyIcon')

if (editReplyIcons.length > 0) {
  editReplyIcons.forEach(function (editReplyIcon) {
    editReplyIcon.addEventListener('click', function () {
      const childNodes = Array.from(editReplyIcon.parentNode.children)
      console.log(childNodes)
      const updateReplyBox = childNodes[1]
      updateReplyBox.classList.toggle('hideElement')
      const reply = childNodes[4]
      let replyText = reply.innerText
      reply.classList.toggle('hideElement')
      const editTextArea = updateReplyBox.children[0]
      editTextArea.value = replyText
    })
  })
}

const updateReplyButtons = Array.from(
  document.querySelectorAll('#updateReplyBtn')
)

if (updateReplyButtons.length > 0) {
  updateReplyButtons.forEach(function (updateReplyButton) {
    updateReplyButton.addEventListener('click', function () {
      console.log(updateReplyButton.parentNode.children)
      const editTextAreaValue = updateReplyButton.parentNode.children[0].value
      const commentid = updateReplyButton.dataset.commentid
      const id = updateReplyButton.dataset.replyid
      if (!editTextAreaValue) {
        alert('reply required')
      }
      console.log('id', commentid, id, editTextAreaValue)
      const formData = new FormData()
      formData.append('replyText', editTextAreaValue)
      formData.append('commentId', commentid)
      const plainFormData = Object.fromEntries(formData.entries())
      const formDataJsonString = JSON.stringify(plainFormData)
      updateReply(id, formDataJsonString)
    })
  })
}

const buttons = Array.from(document.querySelectorAll('#replyBtn'))
buttons.forEach(function (button) {
  button.addEventListener('click', function () {
    const commentId = this.dataset.commentid
    console.log(commentId)
    const textArea = this.previousElementSibling
    if (!textArea.value) {
      alert('reply required')
    }
    const formData = new FormData()
    formData.append('replyText', textArea.value)
    formData.append('commentId', commentId)

    const plainFormData = Object.fromEntries(formData.entries())
    const formDataJsonString = JSON.stringify(plainFormData)
    postReply(formDataJsonString)
  })
})
