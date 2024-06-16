import { RESULT } from "./const";

const initState = {
  data: [],
};

const reducerResult = (state = initState, actions) => {
  switch (actions.type) {
    case RESULT:
      return {
        ...state,
        data: actions?.payload?.data,
      };
    default:
      return state;
  }
};

export default reducerResult