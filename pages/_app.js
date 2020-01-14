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

  componentDidMount() {
    //새로운 페이지 올라올때마다, 기존 스타일시트 삭제.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles)
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