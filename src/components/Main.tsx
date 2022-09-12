import { useRef, useState } from 'react';
import { ScrollView as View, TextInput } from 'react-native';
import List from './List';
import Buttons from './Buttons';

export type Task = { id: number, name: string };
export type CompletedTasks = {
  [key in number]: null | true
};

export default function Main() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [selectedTask, setSelectedTask] = useState<number | null>(null);
  const [completedTasks, setCompletedTasks] = useState<CompletedTasks>({});

  const id = useRef(0);

  const handleNewTask = () => {
    if (newTask.length < 1) return;
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

  const handleSelectedTask = () => {
    const filteredTasks = tasks.filter(({ id: tId }) => selectedTask !== tId);
    setTasks(filteredTasks);
  };

  const removeAllCompleted = () => {
    const newArr = tasks.filter(({ id: tid }) => !(tid in completedTasks));
    setTasks(newArr);
  };

  const moveUpOrDown = (directions: 'up' | 'down') => {
    let currIdx = 0;
    tasks.find(({ id: tid }, idx) => {
      currIdx = idx;
      return tid === selectedTask;
    });

    const arrClone = [...tasks];
    if (directions === 'up') {
      if (currIdx - 1 === -1) return;

      [arrClone[(currIdx - 1)], arrClone[currIdx]] = [arrClone[currIdx], arrClone[currIdx - 1]];
    } else {
      if (currIdx + 1 > tasks.length - 1) return;

      [arrClone[currIdx + 1], arrClone[currIdx]] = [arrClone[currIdx], arrClone[currIdx + 1]];
    }

    setTasks(arrClone);
  };

  return (
    <View>
      <List
        tasks={tasks}
        setSelectedTask={setSelectedTask}
        selectedId={selectedTask}
        handleCompletedTasks={handleCompletedTasks}
        completedTasks={completedTasks}
      />
      <TextInput
        placeholder="ex: buy coffee"
        value={newTask}
        onChangeText={(t) => setNewTask(t)}
      />
      <Buttons
        setTasks={setTasks}
        handleTask={handleNewTask}
        removeAllCompleted={removeAllCompleted}
        handleSelectedTask={handleSelectedTask}
        moveUpOrDown={moveUpOrDown}
      />
    </View>
  );
}
