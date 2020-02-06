import { partActionReducer } from '../../../../../reducers/utils';
import { sendAction } from '../../../../../actions/send'
import { localUpdate } from '../../../../../actions/load';
import storeLoad from '../../../../../selector/storeLoad';

const stateReducer = partActionReducer({
   'toggle': (draft, { payload: { _id } }) => {
      draft.toggleObj[_id] = !draft.toggleObj[_id];
   },
   'setTarget': (draft, { payload }) => {
      draft.target = payload;
   },
   'menuClickedCreate': (draft, { payload: { createType } }, state) => {
      const { data } = state.target;
      let targetId = data._id || 'vacant';
      if (createType === 'doc') targetId = 'vacant';
      draft.createInfo = {
         message: undefined,
         error: false,
         targetId,
         createType,
      }
   },
   'validate': (draft, { payload: { val, parentSubject, dispatch } }, state) => {
      const { createInfo: { createType }, store } = state;

      const subjects = storeLoad(store, `sub@${parentSubject}`);
      const docs = storeLoad(store, `doc@${parentSubject}`);
      let error = false;
      let message;

      const inDocs = docs.some((doc) => {
         if (doc.title === val) return true;
         return false;
      })
      const inSub = subjects.some((sub) => {
         if (sub.name === val) return true;
         return false;
      })

      if (inDocs || inSub) {
         error = true;
         message = (inDocs ? '문서' : '폴더') + ' 이름 중복 입니다.';
      }

      if (!error) {
         const payload = makeSendObj(createType,val,parentSubject);
         dispatch({
            type: 'createItem',
            payload: {
               dispatch,
               ...payload
            }
         });
         return;
      }
      dispatch({ type: 'createError', payload: { message } });
   },

   'createItem': (draft, { payload }, state) => {
      const { dispatch } = payload;
      console.log(payload.data)
      function onSucceess({ _id}) {
         dispatch({type: 'localUpdate',
            payload: {
               _id,
               ...payload.data,
            }
         })
         dispatch({ type: 'createCancle' });
      }
      const onFailure = (data) => {
         dispatch({ type: 'createError', payload: { message: '서버 오류 이름 확인' } });
      }
      state.globalDispatch(
         sendAction({
            url: payload.url,
            data: payload.data,
            onSucceess,
            onFailure
         })
      );
   },

   'localUpdate': (draft, { payload }, { globalDispatch,createInfo:{createType} }) => {
      let nameSpace;
      if (createType === 'subject')
         nameSpace = `sub@${payload.parentSubject}`;
      if (createType === 'doc')
         nameSpace = `doc@${payload.subjectID}`;
      console.log(payload);
      globalDispatch(localUpdate({
         nameSpace,
         data:payload,
         map: (origin, newData) => {
            const { data } = origin;
            return {
               ...origin,
               data: [newData,...data]
            }
         }
      }));
   },
   'createCancle': (draft) => {
      draft.createInfo = {};
   },
   'createError': (draft, { payload: { message } }) => {
      draft.createInfo.message = message,
         draft.createInfo.error = true;
   },

}, {})

function makeSendObj(type, val, parentSubject) {
   if (type === 'subject') {
      return {
         url: 'http://localhost:3000/rest/subject/',
         data: {
            name: val,
            parentSubject
         }
      }
   }
   if (type === 'doc') {
      return {
         url: 'http://localhost:3000/rest/post/',
         data: {
            title: val,
            subjectID: parentSubject,
            edit:true,
         }
      }
   }
}


export default stateReducer;