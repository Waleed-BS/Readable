import {
  GET_CATEGORIES
} from '../actions/Categories_Action'

const initialState = {}

function categories (state = initialState, action) {

  const { categories } = action

  switch (action.type) {

    case GET_CATEGORIES:

    return {
      ...state,
      display: categories
    }

    default:
    return state

  }

}

export default categories
