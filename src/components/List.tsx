import { View, Text } from 'react-native';
import type { Task } from './Main';

type PressHandler = (id: number) => void;

export default function List({
  tasks,
  setSelectedTask,
  handleCompletedTasks,
}: {
  tasks: Task[];
  setSelectedTask: React.Dispatch<React.SetStateAction<null | number>>;
  handleCompletedTasks: PressHandler;
}) {
  return (
    <View accessibilityRole="list">
      {tasks.map(({ id, name }) => (
        <Text
          key={id}
          accessibilityRole="listitem"
          onPress={() => setSelectedTask(id)}
          onLongPress={() => handleCompletedTasks(id)}
        >
          {name}
        </Text>
      ))}
    </View>
  );
}
