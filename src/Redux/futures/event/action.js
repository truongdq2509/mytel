import API_PATH from "../../../config/API_PATH";
import {
  ACTIVE_EVENT_LUCKY_MOON,
  GET_HISTORY_LUCKY_MOON,
  GET_LANTERN_COLLECTION,
  GET_RANK_TABLE,
  POST_PAIRING,
  SPIN_LUCKY_MOON,
} from "./contants";

export const getConfigEvent = () => {
  return {
    type: ACTIVE_EVENT_LUCKY_MOON,
    meta: {
      method: "GET",
      url: API_PATH.configEvent,
    },
  };
};

export const getDataLanternCollection = () => {
  return {
    type: GET_LANTERN_COLLECTION,
    meta: {
      method: "GET",
      url: API_PATH.lanternCollection,
    },
  };
};

export const postStartSpin = (data = {}) => {
  return {
    type: SPIN_LUCKY_MOON,
    meta: {
      method: "POST",
      url: API_PATH.spinLuckyMoon,
      callback: data.callback || null,
    },
  };
};

export const getRankTable = (data) => {
  return {
    type: GET_RANK_TABLE,
    meta: {
      method: "GET",
      url: `${API_PATH.getRankLighting}?my_rank=${data.my_rank}&page=${data.page}&limit=${data.limit}`,
    },
  };
};

export const getHistoryLuckyMoon = () => {
  return {
    type: GET_HISTORY_LUCKY_MOON,
    meta: {
      method: "GET",
      url: API_PATH.historySpinLuckyMoon,
    },
  };
};

export const postApiPairing = (data) => {
  console.log(data);
  
  return {
    type: POST_PAIRING,
    meta: {
      method: "POST",
      url: API_PATH.pairing,
      callback: data?.callback || null
    },
  };
};
