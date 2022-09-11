import React from "react";
import { View, Button } from 'react-native';
import type { Task } from './Main';

export default function Buttons(
  {
    tasks,
    setTasks,
    handleTask,
  }: {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    handleTask: () => void;
  },
) {
  return (
    <View>
      <Button title="create task" onPress={handleTask} />
    </View>
  );
}
