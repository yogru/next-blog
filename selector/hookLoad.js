import { PENDING,NAME_SPACE as load,END} from '../actions/load';

export default function hookLoad(nameSpace){
    return (state)=>{
        const val = state[load][END][nameSpace];
        let pending= state[load][PENDING][nameSpace];
        if(pending === undefined)pending=true;
        return [val, pending ]
    }
}
