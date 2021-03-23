import { createContext, useState } from 'react';

interface UserType {
  name: string,
  repo: string
}

export type UserContextType = {
  userInfo: UserType,
  setUserInfo: (info: any) => void;
}

export const UserContext = createContext<UserContextType>({
  userInfo: {
    name: '',
    repo: ''
  },
  setUserInfo: () => {}
});

export const UserContextProvider = (props: any) => {
  const setUserInfo = (user: UserType) => {
    setState({...state, userInfo: user})
  }

  const initState = {
    userInfo: {
      name: '',
      repo: ''
    },
    setUserInfo: setUserInfo
  }

  const [state, setState] = useState(initState);

  return (
    <UserContext.Provider value = {state}>
      {props.children}
    </UserContext.Provider>
  )
};