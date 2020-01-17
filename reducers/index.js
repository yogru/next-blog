import { combineReducers } from 'redux';
import loadReducer from './loadReducer';
import {LOAD} from '../actions/load'

export default () => {
  const rootReducer = combineReducers({
     [LOAD]: loadReducer,
  });
  return rootReducer;
}