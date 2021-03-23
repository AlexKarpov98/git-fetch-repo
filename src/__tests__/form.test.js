import { fireEvent, render, act } from '@testing-library/react';
import Form from '../components/Form';

describe('UI rendering', () => {
  it('Renders next button', () => {
    const { getByText } = render(<Form />);
    expect(getByText('Next')).toBeInTheDocument();
  });
  
  it('Renders user input', () => {
    const { getByPlaceholderText } = render(<Form />);
    expect(getByPlaceholderText('Github Username')).toBeInTheDocument();
  });
})


describe('Form behavior', () => {
  it('Validate user input and provides error message', async () => {
    const { getByTestId, getByText, getByPlaceholderText } = render(<Form onStep={()=>{}}/>);

    await act (async () => {
      fireEvent.change(getByPlaceholderText('Github Username'), {
        target: {value: ''},
      });
    })

    await act (async () => {
      fireEvent.submit(getByTestId('form'))
    })

    expect(getByText('Please input Username')).toBeInTheDocument();
  });

  it('Should submit when form inputs contains text', async () => {
    const { getByTestId, queryByText, getByPlaceholderText } = render(<Form onStep={()=>{}}/>);

    await act (async () => {
      fireEvent.change(getByPlaceholderText('Github Username'), {
        target: {value: 'webdev'},
      });
    })

    await act (async () => {
      fireEvent.submit(getByTestId('form'))
    })

    expect(queryByText('Please input Username')).not.toBeInTheDocument();
  })
})
