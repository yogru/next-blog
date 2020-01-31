import { partActionReducer } from '../../../../../reducers/utils';

const stateReducer = partActionReducer({
 'updateDocs':(draft, {payload:{docs}})=>{
    draft.docs= docs;
 },
 'updateSubjects':(draft, {payload:{subjects}})=>{
    draft.subjects= subjects;
 },

},{})

export default stateReducer;