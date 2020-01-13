import {PENDING, SUCCESS,FAILURE,FINISH} from '../sagaes/loadSaga'
import {useRef,useState, useEffect} from 'react';
import { useSelector} from 'react-redux';

function useRestLoad(loadName){
 const [name , setName] = useState(loadName)
  useEffect(()=>{
    setName(loadName);
  },[loadName])
  const success = useSelector(state=>state[SUCCESS][name],[loadName]);
  const pedning = useSelector(state=>state[PENDING][name],[loadName]);
  const failure = useSelector(state=>state[FAILURE][name],[loadName]);
  const finish  = useSelector(state=>state[FINISH][name],[loadName]);
  return [pedning,success,failure,finish];
}

export default useRestLoad;