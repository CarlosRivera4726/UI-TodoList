import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://stirred-ladybird-74.hasura.app/v1/graphql',
    headers: {
      'x-hasura-admin-secret': 'StpgVF86YjCS77ZxCF3sYKTtzdc2kRDLdLu6PxpNprZgMgdAWDppWqURPJDC7agc'
    }
  }),
  cache: new InMemoryCache()
});

export default client;