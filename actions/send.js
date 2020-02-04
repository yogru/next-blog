import {  createAction } from 'redux-actions'
export const NAME_SPACE = 'sendSaga';

export const sendAction = createAction(NAME_SPACE ,
({url,data,onSucceess, onFailure })=>({
    url,
    data,
    onFailure,
    onSucceess,
}));