import { partActionReducer } from './utils'
import {CHANGE_FIELD ,INITIALIZE} from '../actions/write';
const initState = {
   title:undefined,
   body:undefined,
   writer:undefined,
   subjects:undefined
}
export default partActionReducer({
    [INITIALIZE]:(draft, action)=>{
          draft = initState;
    },
   [CHANGE_FIELD]:(draft, { payload:{key, value} })=>{
        draft[key]= value;
   }
}
,initState)