import { combineReducers } from 'redux';
import loadReducer from './loadReducer';

export default () => {
  const rootReducer = combineReducers({
     load: loadReducer,
  });
  return rootReducer;
}