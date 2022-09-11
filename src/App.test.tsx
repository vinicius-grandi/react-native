import App from './components/Main';
import { render, screen, fireEvent } from './test-utils';

describe('App', () => {
  it('renders a new task when the button is pressed', () => {
    render(<App />);
    const taskName = 'cool task';
    const inputItem = screen.getByPlaceholderText('ex: buy coffee');
    fireEvent.changeText(inputItem, taskName);
    fireEvent.press(screen.getByText('create task'));

    expect(screen.getByRole('listitem')).toHaveTextContent(taskName);
  });
  it('allows you to delete the selected task or move it above or below each other', () => {
    render(<App />);
    const taskName = 'cool task';

    const inputItem = screen.getByPlaceholderText('ex: buy coffee');
    const createTask = screen.getByText('create task');

    fireEvent.changeText(inputItem, taskName);
    fireEvent.press(createTask);
    fireEvent.changeText(inputItem, 'another task');
    fireEvent.press(createTask);

    const item = screen.getByRole('listitem');

    // selecting task and moving it
    fireEvent.press(item);
    fireEvent.press(screen.getByText('move item below'));

    const allItems = screen.getAllByRole('listItem');

    // checking if item has been moved
    expect(allItems[0]).not.toEqual(item);

    // select item and delete it
    fireEvent.press(item);
    fireEvent.press(screen.getByText('remove selected'));

    expect(screen.getByRole('list')).not.toContainElement(item);
  });
  it('allows you to delete all tasks', () => {
    render(<App />);
    const taskName = 'cool task';

    const inputItem = screen.getByPlaceholderText('ex: buy coffee');

    const createTask = screen.getByText('create task');

    // creating 2 tasks
    fireEvent.changeText(inputItem, taskName);
    fireEvent.press(createTask);
    fireEvent.changeText(inputItem, taskName);
    fireEvent.press(createTask);

    expect(screen.getAllByRole('listitem').length).toBe(2);

    fireEvent.press(screen.getByText('remove all tasks'));

    expect(screen.getAllByRole('listitem').length).toBe(0);
  });
  it('allows you to mark a task as done with a long press on it and you can remove all completed tasks', () => {
    render(<App />);
    const taskName = 'cool task';

    const inputItem = screen.getByPlaceholderText('ex: buy coffee');

    const createTask = screen.getByText('create task');

    fireEvent.changeText(inputItem, taskName);
    fireEvent.press(createTask);

    // a long press on task will mark it as done
    fireEvent(screen.getByText(taskName), 'onLongPress');

    fireEvent.press(screen.getByText('remove all completed tasks'));

    expect(screen.getAllByRole('listitem').length).toBe(0);
  });
});
