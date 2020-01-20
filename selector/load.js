import { PENDING,NAME_SPACE as load,END} from '../actions/load';

export default function selectorMapStateToProps(target,[dataName,isPendingName]){
    return function(reduxState, componentProps){
        return {
           [isPendingName]: reduxState[load][PENDING][target],
           [dataName]: reduxState[load][END][target],
        }
    }
  }

