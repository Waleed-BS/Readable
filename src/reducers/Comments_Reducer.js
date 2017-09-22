import {
	GET_COMMENTS,
	ADD_COMMENT,
	DELETE_COMMENT,
	EDIT_COMMENT,
} from '../actions/Comments_Actions'

const initialState = {}

function comments (state = initialState, action) {

	const { comments, comment, commentId } = action

	switch (action.type) {

	case GET_COMMENTS:
		return {
			...state,
			display: comments
		}

	case ADD_COMMENT:

		let display
		display = state.display
		display.push(comment)

		return {
			...state,
			display
		}

	case DELETE_COMMENT:

		return {
			...state,
			display: state.display.filter( (item) => item.id !== commentId )
		}

	case EDIT_COMMENT:
		return {
			...state,
			display: state.display.map((item) => {
				if(item.id !== comment.id) {
					return item
				} else {
					return comment
				}
			})
		}

	default:
		return state

	}
}


export default comments
