import { render } from '@testing-library/react';
import RepoDetail from '../components/RepoDetail';

describe('UI rendering', () => {
  it('Renders next button', () => {
    const { getByTestId } = render(<RepoDetail />);
    expect(getByTestId('repo_detail_back')).toBeInTheDocument();
  });
})