import {
    FETCH_SONGS_BEGIN,
    FETCH_SONGS_SUCCESS,
    FETCH_SONGS_FAIL,
} from '../actions/types'

const initialState = {
    data: [],
    loading: true,
    error: null,
}

export default songsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SONGS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case FETCH_SONGS_SUCCESS: 
            return {
                ...state,
                data: action.payload,
                loading: false,
            }
        case FETCH_SONGS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}