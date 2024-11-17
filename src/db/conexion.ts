import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'YOUR_HASURA_ENDPOINT',
    headers: {
      'x-hasura-admin-secret': 'YOUR_SECRET_KEY'
    }
  }),
  cache: new InMemoryCache()
});

export default client;