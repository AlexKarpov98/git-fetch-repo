import { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import ReactMarkdownWithHtml from 'react-markdown/with-html';
import gfm from 'remark-gfm';
import { UserContext } from '../context/user-context';

const RepoDetail = (props: any) => {
  const [isLoading, setLoadingStatus] = useState<boolean>(false);
  const [isFail, setFetchStatus] = useState<boolean>(false);
  const [readmeContent, setReadmeContent] = useState<string>('');
  const state = useContext(UserContext);

  useEffect(() => {
    setLoadingStatus(true);
    setReadmeContent('No data to display.')
    const fetchData = async () => {
      await axios.get(
        `https://raw.githubusercontent.com/${state.userInfo.name}/${state.userInfo.repo}/master/README.md`
      ).then(resp => {
        if (resp.data) {
          setReadmeContent(resp.data);
        }
      })
      .catch(e => {
        setFetchStatus(true);
        console.error(e);
      });

      setLoadingStatus(false);
    }

    fetchData();
  }, [state.userInfo?.name, state.userInfo?.repo]);

  return (
    <div>
      <button onClick={() => props.onStep(-1)} data-testid="repo_detail_back">Back</button>
      {isLoading
        ? <h3>Loading...</h3>
        : (
          isFail
          ? <h2>Can't find README file in this repository.</h2>
          : (
            <div>
              <h2>{state.userInfo.name}/{state.userInfo.repo}/README.md</h2>
              <ReactMarkdownWithHtml plugins={[gfm]} children={readmeContent} allowDangerousHtml></ReactMarkdownWithHtml>
            </div>
          )
        )
      }
    </div>
  )
}

export default RepoDetail;
