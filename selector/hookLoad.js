import { PENDING,NAME_SPACE as load,END} from '../actions/load';

export default function hookLoad(nameSpace){
    return (state)=>{
        const val = state[load][END][nameSpace];
        const pending= state[load][PENDING][nameSpace];
        return [val, pending ]
    }
}
