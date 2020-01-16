import { all } from 'redux-saga/effects'
import loadSaga from './loadSaga';

function* rootSaga() {
    yield all(
        [  
            loadSaga(),
        ]
    )
}

export default rootSaga;




