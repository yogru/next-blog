import { PENDING,LOAD,END} from '../actions/load';
import { partActionReducer } from './utils'

const initState = {
     [END]:{},
     [PENDING]:{}, 
}


export function selectorMapStateToProps(target,[dataName,isPendingName]){
  return function(reduxState, componentProps){
      return {
         [isPendingName]: reduxState[LOAD][PENDING][target],
         [dataName]: reduxState[LOAD][END][target],
      }
  }
}


const loadReducer =  partActionReducer({
    [END]:(draft, action)=>{
       draft[END][action.target]={
           success: action.error ? false: true,
           data:action.payload,
        };
      draft[PENDING][action.target] = false;
    },
    [PENDING]:(draft, action)=>{
       draft[PENDING][action.target] = true;
    },
},initState);

export default loadReducer