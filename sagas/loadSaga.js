import {put,call,takeLatest,delay } from 'redux-saga/effects';
import { LOAD,END,PENDING } from '../actions/load';

import axios from 'axios';

function* request(action){
    const { url ,target} = action;
    yield put({
        type:PENDING,
        target,
    });
   //yield delay(3000);
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
    yield takeLatest(LOAD,request);
 }

export default saga;