import API_PATH from '../../../config/API_PATH'
import { RESULT } from './const'

export const getResultProduct = (data={}) => {
    return {
        type: RESULT,
        data,
        meta: {
            method: "GET",
            url: API_PATH.resultsProduct,
            query: data.query || {},
        }
    }
}