import App from './components/Main';
import { render, screen, fireEvent } from './test-utils';

describe('App', () => {
  it('render two text inputs where you can type and calculate your body mass index', () => {
    const s = render(<App />).toJSON();
    const heightInput = screen.getByPlaceholderText('ex: 1.72');
    const weightInput = screen.getByPlaceholderText('ex: 60');

    fireEvent.changeText(heightInput, '1.72');
    fireEvent.changeText(weightInput, '60');

    const calculateBtn = screen.getByRole('button');
    fireEvent.press(calculateBtn);
    expect(s).toMatchSnapshot();
  });
});
