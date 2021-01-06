import * as c from "../actions/ActionType"

export default (state = {}, action) => {
  switch (action.type) {
    case c.SAVED_RESULT:
      return Object.assign({}, state, {
        result: action.savedResult(),
      });
    default:
      return state;
  }
}