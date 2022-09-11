import { useRef, useState } from 'react';
import { View, TextInput } from 'react-native';
import List from './List';
import Buttons from './Buttons';

export type Task = { id: number, name: string };

export default function Main() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [completedTasks, setCompletedTasks] = useState<{
    [key in number]: null | true
  }>({});

  const id = useRef(0);

  const handleNewTask = () => {
    setTasks([...tasks, { id: id.current, name: newTask }]);
    id.current += 1;
    setNewTask('');
  };

  const handleCompletedTasks = (i: number) => {
    if (i in completedTasks) {
      const c = { ...completedTasks };
      delete c[i];
      return setCompletedTasks(c);
    }

    return setCompletedTasks({ ...completedTasks, [i]: true });
  };

  const handleRemoval = () => {
    const filteredTasks = tasks.filter(({ id: tId }) => selectedTask === tId);
    setTasks(filteredTasks);
  };

  const removeAllCompleted = () => {
    const newArr = tasks.filter(({ id: tid }) => {
      if (tid in completedTasks) {
        return true;
      }
      return false;
    });

    setTasks(newArr);
  };

  return (
    <View>
      <List
        tasks={tasks}
        setSelectedTask={setSelectedTask}
        handleCompletedTasks={handleCompletedTasks}
      />
      <TextInput
        placeholder="ex: buy coffee"
        value={newTask}
        onChangeText={(t) => setNewTask(t)}
      />
      <Buttons setTasks={setTasks} tasks={tasks} handleTask={handleNewTask} />
    </View>
  );
}
