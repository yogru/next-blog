import { PENDING,NAME_SPACE as load,END} from '../actions/load';

export default function selectorMapStateToProps(target,[dataName,isPendingName]){
    return function(reduxState, componentProps){
        let pending = reduxState[load][PENDING][target] 
        if( pending === undefined)pending=true;
        return {
           [isPendingName]:pending,
           [dataName]: reduxState[load][END][target],
        }
    }
  }

