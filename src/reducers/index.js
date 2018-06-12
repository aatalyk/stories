import { combineReducers } from 'redux'
import storiesReducer from './storiesReducer'
import songsReducer from './songsReducer'

export default rootReducer = combineReducers({
    stories: storiesReducer,
    songs: songsReducer,
})