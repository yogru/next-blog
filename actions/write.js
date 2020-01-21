import {  createAction } from 'redux-actions'

export const  NAME_SPACE ='write';

export const  INITIALIZE = `${NAME_SPACE}/INIT`;
export  const CHANGE_FIELD = `${NAME_SPACE}/CHANGE_FIELD`;

export  const initializeAction= createAction(INITIALIZE);
export const  changeFieldAction = createAction(CHANGE_FIELD , 
    ({key, value})=>({   key,value})
)