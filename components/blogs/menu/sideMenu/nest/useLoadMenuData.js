import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import loadSelector from '../../../../../selector/hookLoad';
import { loadAction } from '../../../../../actions/load';

export default function useLoadMenuData(parentID){
  const docState = `doc@${parentID}`;
  const subState = `sub@${parentID}`;
  const dispatch = useDispatch();
  const [loadDoc, docPending] = useSelector(loadSelector(docState), [parentID]);
  const [loadSubject, subPending] = useSelector(loadSelector(subState), [parentID]);
  useEffect(() => {
      dispatch(loadAction(docState, `http://localhost:3000/rest/post/titles/${parentID}`));
      dispatch(loadAction(subState, `http://localhost:3000/rest/subject/parent/${parentID}`));
  }, [parentID]);

   if(docPending === true || subPending===true  ) 
     return [ [], [] ];
 return [loadSubject.data, loadDoc.data]
}