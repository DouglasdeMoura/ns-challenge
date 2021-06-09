import { GitHubService } from './GithubService';
import { GET_USER_DATA_BY_LOGIN } from './queries';
import { UserDataResponse } from './types';

const mockResponse: UserDataResponse = {
  user: {
    avatarUrl: 'test_avatarUrl',
    name: 'test_name',
    login: 'test_login',
    followers: {
      totalCount: 1,
    },
    following: {
      totalCount: 1,
    },
    starredRepositories: {
      totalCount: 1,
    },
    twitterUsername: 'test_twitterUsername',
    organizations: {
      nodes: [],
    },
    topRepositories: {
      nodes: [],
    },
  },
};

describe('GitHubService', () => {
  const username = 'test_login';
  const client = { query: jest.fn().mockResolvedValue(Promise.resolve({ data: mockResponse })) };
  let gitHubService;

  beforeEach(() => {
    gitHubService = new GitHubService(client as any);
  });

  it('should query the GraphQL API', () => {
    gitHubService.getUser(username);

    expect(client.query).toHaveBeenCalledWith({
      query: GET_USER_DATA_BY_LOGIN,
      variables: { username },
    });
  });
});
