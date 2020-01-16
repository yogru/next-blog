export const PENDING ='LOAD/PENDING';
export const LOAD = 'LOAD-DATA-SAGA';
export const END= '_/LOAD_END_';

export function createAction(target,url){
    return {
       type:LOAD,
       target,
       url,
    }
}