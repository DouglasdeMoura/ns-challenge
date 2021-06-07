import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import { UserDataResponse } from './types';
import { client as apolloClient } from './client';
import { GET_USER_BY_LOGIN } from './queries';

export class GitHubService {
  constructor(private client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  getUser = (username: string) => (
    this.client.query<UserDataResponse>({
      query: GET_USER_BY_LOGIN,
      variables: { username },
    })
  )
}

export const gitHubService = new GitHubService(apolloClient);
