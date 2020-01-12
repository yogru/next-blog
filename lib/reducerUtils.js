import produce from 'immer';
import {createAction} from 'redux-actions';


export function partActionReducer(actions , initState={}){
    return function(state=initState, action){
        return produce(state,draft =>{
                const handler = actions[action.type];
             if(handler)handler(draft, action);
        })
    }
}

export function mergeReducer(reducers){
  return function(state, action){
        if(!state)  return reducers.reduce((acc,r)=>({...acc,...r(state,action)}),{});
        let nextState =state;
      return reducers.reduce((acc,r)=>{
                      return r(acc,action);
        },state)
  }
}

export const PENDING = '/PENDING';
export const FINISH = '/FINISH';
export const  SUCCESS = '/SUCCESS';
export const  FAILURE ='/FAILURE';

export const basicReducer =  partActionReducer({
    [SUCCESS]:(draft, action)=>{
        draft[SUCCESS][action.type]= action;
    },
     [FAILURE]:(draft, action)=>{
         draft[FAILURE][action.type]= action;
     },
     [PENDING]:(draft, action)=>{
     },
     [FINISH]:(draft, action)=>{
    },



},{})