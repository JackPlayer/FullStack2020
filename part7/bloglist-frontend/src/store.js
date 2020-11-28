/**
 * Redux Store definition
 */
import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

/** Combines all the reducers */
const reducer = combineReducers({
  blogs: blogReducer,
  user: userReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
export default store