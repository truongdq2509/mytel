import API_PATH from '../../../config/API_PATH'
import { BID } from './contants'

export const postBidProduct = (data) => {
    return {
        type: BID,
        data,
        meta: {
            method: "POST",
            url: API_PATH.bid,
            query: data.query || {},
            callback: data?.callback || null,
        }
    }
}