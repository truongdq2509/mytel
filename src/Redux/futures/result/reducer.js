import { RESULT, DETAIL_RESULT } from "./const";

const initState = {
  data: [],
  detail: []
};

const reducerResult = (state = initState, actions) => {
  switch (actions.type) {
    case RESULT:
      return {
        ...state,
        data: actions?.payload?.data,
      };
    case DETAIL_RESULT:
      return {
        ...state,
        detail: actions?.payload?.data,
      }
    default:
      return state;
  }
};

export default reducerResult