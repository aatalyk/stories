import { 
    FETCH_STORIES_BEGIN,
    FETCH_STORIES_SUCCESS,
    FETCH_STORIES_FAIL,
} from '../actions/types'

const initialState = {
    data: [],
    loading: true,
    error: null,
}

export default storiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_STORIES_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,    
            }
        case FETCH_STORIES_SUCCESS:
            return {
                ...state,
                data: action.payload,
                loading: false,
                error: null,
            }
        case FETCH_STORIES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}