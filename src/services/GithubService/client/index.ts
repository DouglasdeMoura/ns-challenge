import { ApolloClient, InMemoryCache } from '@apollo/client';
import 'cross-fetch/polyfill';

export const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  },
  cache: new InMemoryCache(),
});
