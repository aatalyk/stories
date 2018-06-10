import Data from '../instructions'
import { DATA_AVAILABLE } from './types'

export const getData = () => {
    return (dispatch) => {
        setTimeout(() => {
            const data = Data.instructions
            dispatch({type: DATA_AVAILABLE, data: data})
        }, 2000)
    }
}