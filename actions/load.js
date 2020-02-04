import {  createAction } from 'redux-actions'

export const NAME_SPACE = 'loadUseSaga';
export const PENDING =`${NAME_SPACE}/PENDING`;
export const END= `${NAME_SPACE}/END`;
export const LOCAL_UPDATE= `${NAME_SPACE}/local_update`;

export function loadAction(target,url){
    return {
       type:NAME_SPACE,
       target,
       url,
    }
}


export const localUpdate = createAction(LOCAL_UPDATE,
    ({ nameSpace,map,data }) => (
        {
            nameSpace,
            map,
            data,
        })
)