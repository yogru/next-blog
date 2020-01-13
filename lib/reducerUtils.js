import produce from 'immer';

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
