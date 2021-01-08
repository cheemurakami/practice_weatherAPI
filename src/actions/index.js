import * as c from "./ActionType"

export const savedResult = (result) => {
  return {
    type: c.SAVED_RESULT,
    result,
  } 
}
export const savedFiveDaysResult = (result) => {
  return {
    type: c.SAVED_FIVE_DAYS_RESULT,
    result,
  } 
}