import * as c from "./ActionType"

export const savedResult = (result) => {
  return {
    type: c.SAVED_RESULT,
    result,
  } 
}