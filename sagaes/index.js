import { all } from 'redux-saga/effects'
import {mergeReducer} from '../lib/reducerUtils'
import {partActionReducer} from '../lib/reducerUtils';
import loadSaga from './loadSaga';

const initReducer = Object.assign({},loadSaga.initReducer);

const globalReducer= partActionReducer({
    ['INIT']:(draft, action)=>{
        draft = initReducer;
    },
},initReducer)

export const rootReducer =mergeReducer([
    globalReducer,
    loadSaga.reducer,
])

export function* rootSaga() {
    yield all(
        [  
            loadSaga.saga(),
        ]
    )
}

