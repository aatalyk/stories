import { 
    FETCH_STORIES_BEGIN,
    FETCH_STORIES_SUCCESS,
    FETCH_STORIES_FAIL
} from './types'
import * as api from '../config/api'

export const fetchStories = () => {
    return dispatch => {
        dispatch(fetchStoriesBegin())
        api.fetchStories((stories, error) => {
            if (error) {
                dispatch(fetchStoriesFail(error))
                return
            }
            dispatch(fetchStoriesSuccess(stories))
        }) 
    }
}

const fetchStoriesBegin = () => ({
    type: FETCH_STORIES_BEGIN,
})

const fetchStoriesSuccess = stories => ({
    type: FETCH_STORIES_SUCCESS,
    payload: stories,
})

const fetchStoriesFail = error => ({
    type: FETCH_STORIES_FAIL,
    payload: error,
})