import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../context/user-context';

const Form = (props: any) => {
  const state = useContext(UserContext);
  const [userName, setUserName] = useState<string>('');

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = () => {
    state.setUserInfo({
      name: userName,
      repo: ''
    });
    props.onStep(1);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} data-testid='form'>
      <input 
        type="text"
        name="user"
        value={userName}
        onChange={event => setUserName(event.target.value)}
        placeholder="Github Username"
        ref={register({ required: true })}
      />
      <button type="submit">Next</button>
      {errors.user && <h5>Please input Username</h5>}
    </form>
  )
}

export default Form;
