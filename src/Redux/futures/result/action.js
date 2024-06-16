import API_PATH from '../../../config/API_PATH'
import { RESULT, DETAIL_RESULT } from './const'

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

export const getResultDetailProduct = (data={}, id) => {
    return {
        type: DETAIL_RESULT,
        data,
        meta: {
            method: "GET",
            url: `${API_PATH.resultsProduct}/${id}`,
            query: data.query || {},
        }
    }
}