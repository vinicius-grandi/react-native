// import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { registerRootComponent } from 'expo';
import Main from './components/Main';
import { styles as imStyles } from './components/Form';

export const styles = StyleSheet.create({
  container: {
    fontSize: '50px',
    flex: 0.9,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    alignSelf: 'center',
    height: '100%',
  },
  main: {
    flex: 1,
    backgroundColor: '#e6e6e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function App() {
  return (
    <View style={styles.main}>
      <Text style={imStyles.title}>onebithealth</Text>
      <View style={styles.container}>
        <Main />
      </View>
    </View>
  );
}

registerRootComponent(App);
