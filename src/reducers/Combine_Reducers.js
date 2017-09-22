import categories from './Categories_Reducer'
import comments from './Comments_Reducer'
import posts from './Posts_Reducer'
import { combineReducers } from 'redux'

export default combineReducers({
	categories, comments, posts
})
