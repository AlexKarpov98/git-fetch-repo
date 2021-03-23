import { fireEvent, render, act, waitForElementToBeRemoved } from '@testing-library/react';
import RepoList from '../components/RepoList';
import { UserContext, UserContextProvider } from '../context/user-context';

function sleep(ms) {
  return new Promise((resolve) => { setTimeout(resolve, ms)})
}

describe('ReportList behavior', () => {
  let originFetch;
  
  beforeEach(() => {
    originFetch = global.fetch;
  });

  afterEach(() => {
    global.fetch = originFetch;
  });

  it('Should show loading text and error for invaild user', async () => {
    const invaildUser = { userInfo: {
      name: 'invalidUserNameInput',
      repo: ''
    }}

    const { getByText } = render(
      <UserContext.Provider value={ invaildUser }>
        <RepoList />
      </UserContext.Provider>
    )

    expect(getByText('Loading...')).toBeInTheDocument();

    sleep(1000).then(() => {
      expect(getByText('Failed to fetch repositories for this user.')).toBeInTheDocument();
    });
  })
})