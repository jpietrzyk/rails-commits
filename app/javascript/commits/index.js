import React from 'react'
import ReactDOM from 'react-dom'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, concat } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory'

import App from './components/App'

const TOKEN='your_secret_token'

const link = new HttpLink({
  uri: 'https://api.github.com/graphql',
  credentials: true
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${location}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: `Bearer ${TOKEN}`
    }
  });

  return forward(operation);
})

const client = new ApolloClient({
	link: ApolloLink.from([
    errorLink,
    concat(authMiddleware, link)
  ]),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  addTypename: true,
});

const commits = document.querySelector('#commits')

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  , commits
)
