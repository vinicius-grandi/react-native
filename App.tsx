import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import Main from './src/components/Main';

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    padding: 10,
    flex: 1,
  },
});

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Main />
    </SafeAreaView>
  );
}
