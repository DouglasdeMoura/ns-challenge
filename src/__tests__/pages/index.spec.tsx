import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Index from '../../pages';

const mockPush = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe('<Index />', () => {
  it('should display page to the user', () => {
    render(<Index />);
  });

  it('should disable the search button when input value has less than 3 characters', () => {
    render(<Index />);
    userEvent.type(screen.getByLabelText('Type your GitHub username:'), 'ab');
    expect(screen.getByText('Search')).toBeDisabled();
  });

  it('should enable the search button when input value has 3 or more characters', () => {
    render(<Index />);
    userEvent.type(screen.getByLabelText('Type your GitHub username:'), 'abc');
    expect(screen.getByText('Search')).not.toBeDisabled();
  });

  it('should redirect the user to another page when she clicks on Search', () => {
    render(<Index />);
    userEvent.type(screen.getByLabelText('Type your GitHub username:'), 'abc');
    userEvent.click(screen.getByText('Search'));
    expect(mockPush).toHaveBeenCalledWith('/user/abc');
  });
});
