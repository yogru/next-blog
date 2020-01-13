import React from 'react'
import {Provider} from 'react-redux'
import App from 'next/app'
import withRedux from 'next-redux-wrapper'
import withReduxSaga from 'next-redux-saga'
import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {rootReducer ,rootSaga} from '../sagaes';
import { composeWithDevTools } from 'redux-devtools-extension';

function configureStore(preloadedState, {isServer, req = null}) {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
  )
  /**
   * next-redux-saga depends on `sagaTask` being attached to the store during `getInitialProps`.
   * It is used to await the rootSaga task before sending results to the client.
   * However, next-redux-wrapper creates two server-side stores per request:
   * One before `getInitialProps` and one before SSR (see issue #62 for details).
   * On the server side, we run rootSaga during `getInitialProps` only:
   */

  if (req || !isServer) {
    store.sagaTask = sagaMiddleware.run(rootSaga)
  }
  return store
}

class MyApp extends App {
  static async getInitialProps({Component, ctx}) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return {pageProps}
  }
  render() {
    const {Component, pageProps, store} = this.props
    return (
      <>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </>
    )
  }
}

export default withRedux(configureStore)(withReduxSaga(MyApp))