import {
	GET_POSTS,
	DELETE_POST,
	EDIT_POST
} from '../actions/Posts_Actions'

const initialState = {}

function posts (state = initialState, action) {

	const { posts, postId, post } = action

	switch (action.type) {

	case GET_POSTS:

		return {
			...state,
			display: posts
		}

	case DELETE_POST:

		return {
			...state,
			display: state.display.filter((item) => item.id !== postId)

		}

	case EDIT_POST:

		return {
			...state,
			display: state.display.map((item) => {
				if(item.id !== post.id) {
					console.log('item.id !== post.id')
					return item
				} else {
					console.log('item.id === post.id')
					return post
				}
			})
		}

	default:
		return state

	}

}

export default posts
