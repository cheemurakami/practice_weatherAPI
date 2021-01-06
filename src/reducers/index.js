import { combineReducers } from 'redux'
import weatherResultReducer from './weatherResultReducer'

const rootReducer = combineReducers(
  {
    weatherResultReducer,
  }
);

export default rootReducer;