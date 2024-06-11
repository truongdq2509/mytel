import { BID } from "./contants";

const initState = {
  bid: [],
};

const reducerBid = (state = initState, actions) => {
  switch (actions.type) {
    case BID:
      return {
        ...state,
        bid: actions.payload.data,
      };
    default:
      return state;
  }
};

export default reducerBid