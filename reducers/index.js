import { combineReducers } from 'redux';
import loadReducer from './loadReducer';
import {LOAD} from '../actions/load'
import {NAME_SPACE as write ,  } from '../actions/write'
import writeReducer from './writeReducer';

export default () => {
  const rootReducer = combineReducers({
     [LOAD]: loadReducer,
     [write]:writeReducer,
  });
  return rootReducer;
}