import { combineReducers } from 'redux'
import { DATA_AVAILABLE } from '../actions/types'

const initialState = {
    data: [],
    loading: false,
}

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case DATA_AVAILABLE:
            return {
                ...state,
                data: [...state.data, ...action.data],
                loading: false,
            }
        default:
            return state
    }
}

export default rootReducer = combineReducers({
    songs: dataReducer,
})