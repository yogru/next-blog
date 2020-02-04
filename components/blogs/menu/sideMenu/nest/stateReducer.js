import { partActionReducer } from '../../../../../reducers/utils';
import {sendAction} from '../../../../../actions/send'
import  {localUpdate}  from '../../../../../actions/load';
import storeLoad from '../../../../../selector/storeLoad';

const stateReducer = partActionReducer({
   'load@complete':(draft , {payload:{subjects , docs}})=>{
      draft.subjects =subjects;
      draft.docs=docs;
      draft.toggleObj = subjects.reduce((acc, item)=>{
         acc[item._id]= false;
         return acc;
       },{})
   },
   'toggle':(draft,{payload:{_id}})=>{
      draft.toggleObj[_id] =!draft.toggleObj[_id];
   },
   
   'setTarget': (draft, { payload }) => {
      draft.target = payload;
   },
   'menuClickedCreate': (draft, { payload:{type:createType} }, state) => {
     const {type ,data} = state.target;
     let targetId= data._id || 'vacant';
     if(type === 'doc')targetId = 'vacant';
      draft.createInfo = {
         message: undefined,
         error: false,
         createType,
         targetId
      }
   },
   'updated': (draft, { payload: { type, name,_id, title, parentSubject } }, { globalDispatch }) => {
      console.log('update..>~~', _id)
      let nameSpace = `doc@${parentSubject}`;
      if (type === 'subject') nameSpace = `sub@${parentSubject}`;

      const data = {
         name,
         title,
         parentSubject,
         _id,
      }
      globalDispatch(localUpdate({
         nameSpace,
         data,
         map: (origin, newData) => {
            origin
            const { data } = origin;
            return {
               ...origin,
               data:[...data, newData]
            }
         }
      }))

   },
   'createSubject':(draft,{payload:{name , parentSubject , dispatch}},state)=>{
       console.log('createSubject...',name,parentSubject)

       const onSucceess = (data)=>{
          console.log('sucData:',data)
         dispatch({type:'updated', payload:{type:'subject',
            _id:data.id, name,parentSubject}});
         dispatch({type:'createCancle'});
       }

      state.globalDispatch(
         sendAction({
            url:'http://localhost:3000/subject/',
            data:{
               name,
               parentSubject,
            },
            onSucceess,
            onFailure:(data)=>{ console.log(data)},
         })
      );
   },

   'createItemSubmit':(draft ,{ payload:{docs , subjects , val ,parentSubject, dispatch} } )=>{
         console.log(val,docs , subjects );
      let error= false;
      let message;
      const inDocs=  docs.some((doc)=>{
         if(doc.title === val) return true;
         return false;
      })
     const inSub= subjects.some((sub)=>{
         if(sub.name===val)return true;
         return false;
      })
        
     if(inDocs || inSub){
       error= true;
       message=  (inDocs? '문서' : '폴더') +' 이름 중복 입니다.';
     }

     if(!error){
        dispatch({type:'createSubject' , payload:{name:val,dispatch,parentSubject}});
      //  dispatch({type:'createCancle'});
       return;
     }
     draft.createInfo.error=true;
     draft.createInfo.message= message;
   },

   'createCancle': (draft) => {
      draft.createInfo = {};
   }

}, {})

export default stateReducer;