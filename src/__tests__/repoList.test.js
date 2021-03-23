import { render } from '@testing-library/react';
import RepoList from '../components/RepoList';

describe('UI rendering', () => {
  it('Renders next button', () => {
    const { getByTestId } = render(<RepoList />);
    expect(getByTestId('repo_list_back')).toBeInTheDocument();
  });
})