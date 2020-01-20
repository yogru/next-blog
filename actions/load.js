export const NAME_SPACE = 'loadUseSaga';
export const PENDING =`${NAME_SPACE}/PENDING`;
export const END= `${NAME_SPACE}/END`;

export function loadAction(target,url){
    return {
       type:NAME_SPACE,
       target,
       url,
    }
}