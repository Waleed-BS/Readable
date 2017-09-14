export const GET_POSTS = 'GET_POSTS'
export const DELETE_POST = 'DELETE_POST'
export const EDIT_POST = 'EDIT_POST'

export function getPosts ( {posts} ) {
  return {
    type: GET_POSTS,
    posts,
  }
}

export function deletePost ( {postId} ) {
  return {
    type: DELETE_POST,
    postId
  }
}

export function editPost ( {post} ) {
  return {
    type: EDIT_POST,
    post
  }

}
