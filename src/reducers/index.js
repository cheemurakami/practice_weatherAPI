import { combineReducers } from 'redweatherResultReducerux'
import weatherResultReducer from './'

const rootReducer = combineReducers(
  {
    weatherResultReducer,
  }
);

export default rootReducer;