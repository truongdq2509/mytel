import API_PATH from '../../../config/API_PATH'
import { BID } from './contants'

export const postBidProduct = (data) => {
    return {
        type: BID,
        data,
        meta: {
            method: "POST",
            url: API_PATH.bidProduct,
            query: data.query || {},
        }
    }
}