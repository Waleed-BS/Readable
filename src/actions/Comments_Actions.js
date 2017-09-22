export const GET_COMMENTS = 'GET_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'

export function getComments ( {comments} ) {
	return {
		type: GET_COMMENTS,
		comments
	}
}

export function addComment ( {comment} ) {
	return {
		type: ADD_COMMENT,
		comment
	}
}

export function deleteComment ( {commentId} ) {
	return {
		type: DELETE_COMMENT,
		commentId
	}
}

export function editComment ( {comment} ) {
	return {
		type: EDIT_COMMENT,
		comment
	}
}
