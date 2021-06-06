import { ApolloError } from '@apollo/client';
import { createMocks } from 'node-mocks-http';

import handleUsername from '../../../../pages/api/users/[username]';
import { gitHubService } from '../../../../services/GithubService/GithubService';

describe('[username]', () => {
  const responseData = {
    data: {
      user: {
        avatarUrl: 'test_avatar',
        name: 'test_name',
        login: 'test_user',
      },
    },
    loading: false,
    networkStatus: 200,
  };
  let request;
  let response;

  beforeEach(() => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        username: 'test_user',
      },
    });

    request = req;
    response = res;
  });

  it('should return data fetched from the GraphQL API', async () => {
    jest.spyOn(gitHubService, 'getUser').mockImplementationOnce(() => Promise.resolve(responseData));

    await handleUsername(request, response);

    expect(gitHubService.getUser).toHaveBeenCalledWith(request.query.username);
    expect(response._getStatusCode()).toBe(200);
    expect(response._getJSONData()).toEqual(responseData.data.user);
  });

  it('should return an error when given username is invalid/non-existent', async () => {
    jest.spyOn(gitHubService, 'getUser').mockImplementationOnce(() => (
      Promise.reject(() => new ApolloError({ errorMessage: '' }))
    ));

    await handleUsername(request, response);

    expect(gitHubService.getUser).toHaveBeenCalledWith(request.query.username);
    expect(response._getStatusCode()).toBe(404);
    expect(response._getJSONData()).toEqual({ message: 'Unable to retrieve user\'s data' });
  });
});
