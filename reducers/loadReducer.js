import { PENDING,END,LOCAL_UPDATE} from '../actions/load';
import { partActionReducer } from './utils'

const initState = {
     [END]:{},
     [PENDING]:{}, 
}

const loadReducer = partActionReducer({
   [END]: (draft, action) => {
      draft[END][action.target] = {
         success: action.error ? false : true,
         data: action.payload,
      };
      draft[PENDING][action.target] = false;
   },
   [PENDING]: (draft, action) => {
      draft[PENDING][action.target] = true;
   },
   [LOCAL_UPDATE]: (draft, {payload:{nameSpace,map, data}},state ) => {
      console.log( 'reducer_load..',state[END][nameSpace] );
      draft[END][nameSpace] = map( state[END][nameSpace] ,data );
   },
}, initState);

export default loadReducer
