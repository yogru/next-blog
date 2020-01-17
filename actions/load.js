export const PENDING ='LOAD/PENDING';
export const LOAD = 'REST/LOAD';
export const END= 'LOAD/END';

export function createAction(target,url){
    return {
       type:LOAD,
       target,
       url,
    }
}