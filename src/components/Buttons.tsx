import {
  View,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';
import type { Task } from './Main';

const styles = StyleSheet.create({
  button: {
    margin: 5,
    backgroundColor: '#b1cbf3',
    padding: 5,
    borderRadius: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 19,
    textTransform: 'uppercase',
  },
});

function TextButton({ children }: { children: string }) {
  return <Text style={styles.text}>{children}</Text>;
}

export default function Buttons({
  setTasks,
  handleTask,
  removeAllCompleted,
  handleSelectedTask,
  moveUpOrDown,
}: {
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  handleTask: () => void;
  removeAllCompleted: () => void;
  handleSelectedTask: () => void;
  moveUpOrDown: (direction: 'up' | 'down') => void;
}) {
  return (
    <View>
      <Pressable onPress={handleTask} style={styles.button}>
        <TextButton>create task</TextButton>
      </Pressable>
      <Pressable onPress={() => moveUpOrDown('up')} style={styles.button}>
        <TextButton>move item up</TextButton>
      </Pressable>
      <Pressable onPress={() => moveUpOrDown('down')} style={styles.button}>
        <TextButton>move item down</TextButton>
      </Pressable>
      <Pressable onPress={handleSelectedTask} style={styles.button}>
        <TextButton>remove selected</TextButton>
      </Pressable>
      <Pressable onPress={() => setTasks([])} style={styles.button}>
        <TextButton>remove all tasks</TextButton>
      </Pressable>
      <Pressable onPress={removeAllCompleted} style={styles.button}>
        <TextButton>remove all completed tasks</TextButton>
      </Pressable>
    </View>
  );
}
