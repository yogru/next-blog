import {put,call,takeEvery,delay } from 'redux-saga/effects';
import { NAME_SPACE as load,END,PENDING } from '../actions/load';

import axios from 'axios';

function* request(action){
    const { url ,target} = action;
    yield put({
        type:PENDING,
        target,
    });
    
  // yield delay(5000);
   try{
     const response= yield call(axios.get,url);
    yield put({
        type:END,
        target,
        error:false,
        payload: response.data,
    });
   }catch(e){
     yield put({
         type:END,
         target,
         error:e,
         payload:e,
     });
   }
}

function * saga(){
    yield takeEvery(load,request);
 }

export default saga;