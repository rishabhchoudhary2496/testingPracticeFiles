const likeBlog = async (id) => {
  try {
    const result = await fetch(`http://localhost:5000/${id}/like`, {
      method: 'POST',
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

const dislikeBlog = async (id) => {
  try {
    const result = await fetch(`http://localhost:5000/${id}/dislike`, {
      method: 'POST',
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

const likeBtn = document.getElementById('thumbsUp')
const dislikeBtn = document.getElementById('thumbsDown')
const [_, id] = window.location.pathname.split('/')

likeBtn.addEventListener('click', function (e) {
  likeBlog(id)
})
dislikeBtn.addEventListener('click', function (e) {
  dislikeBlog(id)
})
