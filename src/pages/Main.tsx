import { useState } from 'react';
import Form from '../components/Form';
import RepoList from '../components/RepoList';
import RepoDetail from '../components/RepoDetail';
import { UserContextProvider } from '../context/user-context';

const Main = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  
  const onStep = (direction: number) => {
    setCurrentStep(currentStep + direction);
  }

  return (
    <UserContextProvider>
      {currentStep === 0 && <Form onStep={onStep}/>}
      {currentStep === 1 && <RepoList onStep={onStep}/>}
      {currentStep === 2 && <RepoDetail onStep={onStep}/>}
    </UserContextProvider>
  )
}

export default Main;
