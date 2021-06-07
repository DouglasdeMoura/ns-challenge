import { createMocks } from 'node-mocks-http';

import handleUsername from '../../../../pages/api/users/[userid]';
import { gitHubService } from '../../../../api/services/GithubService/GithubService';

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
        userid: 'test_user',
      },
    });

    request = req;
    response = res;
  });

  it('should return data fetched from the GraphQL API', async () => {
    jest.spyOn(gitHubService, 'getUser').mockImplementationOnce(() => Promise.resolve(responseData));

    await handleUsername(request, response);

    expect(gitHubService.getUser).toHaveBeenCalledWith(request.query.userid);
    expect(response._getStatusCode()).toBe(200);
    expect(response._getJSONData()).toEqual(responseData.data.user);
  });

  it('should return a 404 error when error type is equal to NOT_FOUND', async () => {
    jest.spyOn(gitHubService, 'getUser').mockImplementationOnce(() => (
      Promise.reject({ type: 'NOT_FOUND', message: 'Mocked error' })
    ));

    await handleUsername(request, response);

    expect(gitHubService.getUser).toHaveBeenCalledWith(request.query.userid);
    expect(response._getStatusCode()).toBe(404);
    expect(response._getJSONData()).toEqual({ message: 'Mocked error' });
  });

  it('should return a 500 error when error type is not equal NOT_FOUND', async () => {
    jest.spyOn(gitHubService, 'getUser').mockImplementationOnce(() => (
      Promise.reject({ type: 'ANY', message: 'Mocked error' })
    ));

    await handleUsername(request, response);

    expect(gitHubService.getUser).toHaveBeenCalledWith(request.query.userid);
    expect(response._getStatusCode()).toBe(500);
    expect(response._getJSONData()).toEqual({ message: 'Mocked error' });
  });
});
