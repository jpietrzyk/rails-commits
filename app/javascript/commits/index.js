import React from 'react'
import ReactDOM from 'react-dom'

import { ApolloProvider } from 'react-apollo'

import { initialize } from 'redux-oauth'
import { Provider } from 'react-redux'

import configureStore from './config/configureStore'
import configureClient from './config/configureClient'
import configureOauth from './config/configureOauth'

import App from './components/App'

const initialState  = window.__INITIAL_STATE__ || {};

const store = configureStore(initialState);

const client = configureClient()

const reduxOauthConfig = configureOauth()

const commits = document.querySelector('#commits')

store.dispatch(initialize(reduxOauthConfig)).then(
  () => {
    ReactDOM.render(
      <Provider store={store}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </Provider>
      , commits
    )
  }
)
