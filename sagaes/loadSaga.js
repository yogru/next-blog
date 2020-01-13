import {put,call,takeLatest,delay } from 'redux-saga/effects';
import { partActionReducer } from '../lib/reducerUtils';
import axios from 'axios';

export const PENDING ='LOAD/PENDING';
export const FINISH  ='LOAD/FINISH';
export const SUCCESS ='LOAD/SUCCESS';
export const FAILURE ='LOAD/FAILURE';
export const LOAD = 'LOAD-SAGA/LOAD';

export function createLoadAction(loadPropName,url,...payload){
   return {
    type:LOAD,
    url,
    loadPropName,
    payload,
   }
}
export const initReducer= {
    [SUCCESS]:{},
    [FAILURE]:{},
    [PENDING]:{},
    [FINISH]:{},
}

export const loadReducer =  partActionReducer({
     [SUCCESS]:(draft, action)=>{
        draft[SUCCESS][action.loadPropName]={...action.payload};
     },
     [FAILURE]:(draft, action)=>{
         draft[FAILURE][action.loadPropName]={error:true,...action.payload};
     },
     [PENDING]:(draft, action)=>{
        draft[PENDING][action.loadPropName] = true;
     },
     [FINISH]:(draft, action)=>{
        draft[FINISH][action.loadPropName]=true;
     },
},initReducer);

export function * saga(){
   yield takeLatest(LOAD,request);
}

function* request(action){
    const {url ,loadPropName} = action;
    yield put({
        type:PENDING,
        loadPropName,
    });
   // yield delay(3000);
   try{
     const response= yield call(axios.get,url);
    yield put({
        type:SUCCESS,
        loadPropName,
        payload: response.data,
    });
   }catch(e){
    yield put({
        type:FAILURE,
        loadPropName,
        payload:e,
    });
   }finally{
     yield put({
         type:FINISH,
         loadPropName,
    });
   }
}

const loadSaga = {
   saga,
   reducer:loadReducer,
   initReducer,
   actionTypes:[
      PENDING,
      FINISH,
      SUCCESS,
      FAILURE,
      LOAD,
   ],
   createAction:createLoadAction,
}

export default loadSaga;