import {
    FETCH_SONGS_BEGIN,
    FETCH_SONGS_SUCCESS,
    FETCH_SONGS_FAIL,
} from './types'
import * as api from '../config/api'

export const fetchSongs = () => {
    return dispatch => {
        dispatch(fetchSongsBegin)
        api.fetchSongs((songs, error) => {
            if (error) {
                dispatch(fetchSongsFail(error))
                return
            }
            dispatch(fetchSongsSuccess(songs))
        })
    }
}

export const fetchSongsBegin = () => ({
    type: FETCH_SONGS_BEGIN,
})

export const fetchSongsSuccess = songs => ({
    type: FETCH_SONGS_SUCCESS,
    payload: songs,
})

export const fetchSongsFail = error => ({
    type: FETCH_SONGS_FAIL,
    payload: error,
})