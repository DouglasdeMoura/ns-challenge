import type { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import { UserDataResponse } from './types';
import { client as apolloClient } from './client';
import { GET_USER_DATA_BY_LOGIN } from './queries';
import { userDataMapper } from './utils/userDataMapper';

export class GitHubService {
  constructor(private client: ApolloClient<NormalizedCacheObject>) {
    this.client = client;
  }

  getUser = (username: string) => (
    this.client.query<UserDataResponse>({
      query: GET_USER_DATA_BY_LOGIN,
      variables: { username },
    })
      .then((res) => (
        userDataMapper(res.data)
      ))
  )
}

export const gitHubService = new GitHubService(apolloClient);
