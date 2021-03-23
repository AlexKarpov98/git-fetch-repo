import { useState, useEffect, Fragment, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/user-context';

const RepoList = (props: any) => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [repoList, setRepoList] = useState<string[]>([]);
  const [repoCount, setRepoCount] = useState<number>(0);
  const [isLoading, setLoadingStatus] = useState<boolean>(false);
  const [isFail, setFetchStatus] = useState<boolean>(false);

  useEffect(() => {
    setLoadingStatus(true);
    const fetchData = async () => {
      await axios.get(
        `https://api.github.com/users/${userInfo.name}/repos`
      ).then(resp => {
        if (resp.data) {
          let list = resp.data.map((repo: any) => { return repo.name })
          setRepoList(list);
          setRepoCount(list.length);
        }
      })
      .catch(e => {
        setFetchStatus(true);
        console.error(e);
      });

      setLoadingStatus(false);
    }

    fetchData();
  }, [userInfo?.name]);

  const onSubmit = (value: string) => {
    setUserInfo({
      name: userInfo.name,
      repo: value
    });

    props.onStep(1);
  }

  return (
    <div>
      <button onClick={() => props.onStep(-1)} data-testid="repo_list_back">Back</button>
      {isLoading
        ? <h3>Loading...</h3>
        : (
          isFail
          ? <h2>Failed to fetch repositories for this user.</h2>
          : (
            repoCount <= 0 
            ? <h2>There is no data to display.</h2>
            : (
              repoList.map((item, index) => {
                return (
                <Fragment key={index}>
                  <h5 onClick={() => onSubmit(item)}>{item}</h5>
                </Fragment>)
              })
            )
          )
        )
      }
    </div>
    
  )
}

export default RepoList;
