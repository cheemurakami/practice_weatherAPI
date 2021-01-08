import * as c from "../actions/ActionType"

export default (state = {}, action) => {
  switch (action.type) {
    case c.SAVED_RESULT:
      return {
        ...state,
        result: action.result,
      };
    case c.SAVED_FIVE_DAYS_RESULT:
      return {
        ...state,
        fiveDaysResult: action.result,
      };
    default:
      return state;
  }
}