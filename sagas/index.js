import { all } from 'redux-saga/effects'
import loadSaga from './loadSaga';
import sendSaga from './sendSaga';

function* rootSaga() {
    yield all(
        [  
            sendSaga(),
            loadSaga(),
        ]
    )
}

export default rootSaga;




