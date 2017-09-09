
const api = 'http://localhost:5001'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

//author, category, title, body
//Date.now()
export const createPost = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json())

export const getPost = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(data => data)

export const voteOnPost = (postId, option) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( {option} )
  }).then(res => res.json())

export const editPost = (postId, postDetails) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( {postDetails} )
  }).then(res => res.json())


export const deletePost = (postId) =>
 fetch(`${api}/posts/${postId}`, {
   method: 'DELETE',
   headers
 }).then(res => res.json())

export const getAllComments = (postId) =>
  fetch(`${api}/posts/${postId}/$comments`, { headers })
    .then(res => res.json())
    .then(data => data)

export const addComment = (comment) =>
  fetch(`${api}/posts/$comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( {comment} )
  }).then(res => res.json())

export const getComment = (postId) =>
  fetch(`${api}/comments/${postId}`, { headers })
    .then(res => res.json())
    .then(data => data)

export const voteOnComment = (commentId, option) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( {option} )
  }).then(res => res.json())

export const editComment = (commentId, commentDetails, commentBody) =>
  fetch(`${api}/posts/${commentId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( commentDetails )
  }).then(res => res.json())

export const deleteComment = (commentId) =>
  fetch(`${api}/posts/${commentId}`, {
    method: 'DELETE',
    headers
  }).then(res => res.json())
