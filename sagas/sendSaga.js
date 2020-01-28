import {call,takeEvery } from 'redux-saga/effects';
import { NAME_SPACE as send } from '../actions/send';
import axios from 'axios';

function* response(action){
   const { data ,url,onSucceess,onFailure} = action.payload;
   try{
     const res = yield call(axios.post,url,data);
     console.log(res.data);
       onSucceess&& onSucceess(res.data,res);
   }catch(e){
      onFailure && onFailure(e);
   }
}

function * saga(){
    yield takeEvery(send,response);
 }


export default saga;