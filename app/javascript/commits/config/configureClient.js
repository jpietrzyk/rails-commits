import { ApolloClient } from 'apollo-client'

import { ApolloLink, concat } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'

const TOKEN=process.env.API_ACCESS_TOKEN

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${location}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const queryOrMutationLink = () =>
  new ApolloLink((operation, forward) => {
    /*
    You can use a simple middleware link like this one to set credentials,
    headers, or whatever else you need on the context.
    All links in the chain will have access to the context.
    */
    operation.setContext({
      headers: {
        authorization: `Bearer ${TOKEN}`
      },
      credentials: true,
    });

    return forward(operation);
  }).concat(
    new HttpLink({
      uri: 'https://api.github.com/graphql',
    })
  );

const configureClient = () =>
  new ApolloClient({
    ssrForceFetchDelay: 100,
    link: ApolloLink.from([
      errorLink,
      queryOrMutationLink(),
    ]),
    cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  });

export default configureClient
