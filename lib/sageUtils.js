import {put,call,delay } from 'redux-saga/effects';

export const createRequestSaga = (traget, req)=>{
    return function*(action){
           yield put({

           });
        //  yield delay(5000);
         try{
             const response= yield call(req, action.payload);
             yield put({
                 type:'',
                 traget,
                 payload: response.data,
             });
 
         }catch(e){
             yield put({
                 type:failure,
                 traget,
                 payload:e,
                 error:true       
             });
         }finally{
            yield put({
                type
            });
         }
    }
 }
 
 