import { View, Text, StyleSheet } from 'react-native';
import type { CompletedTasks, Task } from './Main';

type PressHandler = (id: number) => void;

const styles = StyleSheet.create({
  task: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default function List({
  tasks,
  setSelectedTask,
  handleCompletedTasks,
  selectedId,
  completedTasks,
}: {
  tasks: Task[];
  selectedId: number | null;
  setSelectedTask: React.Dispatch<React.SetStateAction<null | number>>;
  completedTasks: CompletedTasks
  handleCompletedTasks: PressHandler;
}) {
  return (
    <View accessibilityRole="list">
      {tasks.map(({ id, name }) => (
        <Text
          key={id}
          accessibilityRole="menuitem"
          style={[
            styles.task,
            { backgroundColor: selectedId === id ? 'red' : 'white', textDecorationLine: id in completedTasks ? 'line-through' : 'none' },
          ]}
          onPress={() => setSelectedTask(id)}
          onLongPress={() => handleCompletedTasks(id)}
          adjustsFontSizeToFit
        >
          {name}
        </Text>
      ))}
    </View>
  );
}
