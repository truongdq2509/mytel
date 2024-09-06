import {
  ACTIVE_EVENT_LUCKY_MOON,
  GET_LANTERN_COLLECTION,
  GET_RANK_TABLE,
  SPIN_LUCKY_MOON,
} from "./contants";

const initState = {
  configEventLuckyMoon: [],
  dataLanternCollection: [],
  dataSpinLuckyMoon: [],
  dataRankTable: [],
};

const reducerEvent = (state = initState, actions) => {
  switch (actions.type) {
    case ACTIVE_EVENT_LUCKY_MOON:
      return {
        ...state,
        configEventLuckyMoon: actions.payload.data,
      };
    case GET_LANTERN_COLLECTION:
      return {
        ...state,
        dataLanternCollection: actions.payload.data,
      };
    case SPIN_LUCKY_MOON:
      return {
        ...state,
        dataSpinLuckyMoon: actions.payload.data,
      };
    case GET_RANK_TABLE:
      return {
        ...state,
        dataRankTable: actions.payload.data,
      };
    default:
      return state;
  }
};

export default reducerEvent;
