import produce from 'immer';

export function partActionReducer(actions , initState={}){
    return function(state=initState, action){
        return produce(state,draft =>{
                const handler = actions[action.type];
             if(handler)handler(draft,action,state);
        })
    }
}