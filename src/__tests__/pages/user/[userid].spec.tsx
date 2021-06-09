import { screen, render } from '@testing-library/react';

import UserId from '../../../pages/user/[userid]';

const mockUseUserDataLoading = { loading: true };
const mockUseUserDataError = { loading: false, error: true };
const mockUseUserData = {
  loading: false,
  error: false,
  data: {
    user: {
      avatarUrl: 'test_avatarUrl',
      name: 'test_name',
      login: 'test_login',
      followers: 1,
      following: 2,
      starredRepositories: 3,
      twitterUsername: 'test_twitterUsername',
      organizations: [],
      topRepositories: [],
    },
  },
};

jest.mock('next/router', () => ({
  useRouter: () => ({ query: { userid: 'test_user' } }),
}));

describe('<UserId>', () => {
  it('should render the page', () => {
    jest.mock('../../../hooks/useUserData', () => mockUseUserData);

    render(<UserId />);
  });

  it('should display loading message', () => {
    jest.mock('../../../hooks/useUserData', () => mockUseUserDataLoading);

    render(<UserId />);
    screen.getByText('Loading...');
  });

  it('should display error message when no data is retrieved', async () => {
    jest.mock('../../../hooks/useUserData', () => mockUseUserDataError);

    render(<UserId />);
    await screen.findByText('Unable to find this user :(');
    await screen.findByText('Try to search for another user');
  });
});
