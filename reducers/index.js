import { combineReducers } from 'redux';
import loadReducer from './loadReducer';
import {NAME_SPACE as load} from '../actions/load'
import {NAME_SPACE as write} from '../actions/write'
import writeReducer from './writeReducer';

export default () => {
  const rootReducer = combineReducers({
     [load]:loadReducer,
     [write]:writeReducer,
  });
  return rootReducer;
}