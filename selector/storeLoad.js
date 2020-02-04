import { PENDING,NAME_SPACE as load,END} from '../actions/load';

export default function storeLoad(store, nameSpace){
   const state= store.getState();
   let pending= state[load][PENDING][nameSpace];
   const val = state[load][END][nameSpace];
   if(pending === false) return val.data;
   return undefined;
}


