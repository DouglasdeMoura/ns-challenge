import { GitHubService } from './GithubService';
import { GET_USER_BY_LOGIN } from './queries';

describe('GitHubService', () => {
  const username = 'test_user';
  const client = { query: jest.fn() };
  let gitHubService;

  beforeEach(() => {
    gitHubService = new GitHubService(client as any);
  });

  it('should query the GraphQL API', () => {
    gitHubService.getUser(username);

    expect(client.query).toHaveBeenCalledWith({
      query: GET_USER_BY_LOGIN,
      variables: { username },
    });
  });
});
