import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

interface Person {
  height: number;
  weight: number;
  calculateBmi: () => number
}

function NumberPad({ handler }: { handler: (v: number) => void }) {
  return (
    <TextInput
      keyboardType="number-pad"
      style={styles.textbox}
      onChangeText={(t) => handler(Number(t))}
    />
  );
}

export default function App() {
  const [res, setRes] = useState(0);
  const [person, setPerson] = useState<Person>({
    height: 0,
    weight: 0,
    calculateBmi() {
      const { weight, height } = this as Person;
      if (weight !== 0 && height !== 0) {
        return Math.round(weight / height);
      }
      return 0;
    }
  });

  const handleHeight = (val: number) => {
    setPerson({ ...person, height: val })
  }

  const handleWeight = (val: number) => {
    setPerson({ ...person, weight: val })
  }

  return (
    <View style={styles.main}>
      <Text style={styles.title}>onebithealth</Text>
      <View style={styles.container}>
        <Text>Altura</Text>
        <NumberPad handler={handleHeight} />
        <Text>Peso</Text>
        <NumberPad handler={handleWeight} />
        <Button title="Calcular" color="#e21538" onPress={() => {
          setRes(person.calculateBmi());
        }} />
        { res !== 0 && <Text style={styles.title}>{res}</Text> }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: '50px',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: "80%",
    alignSelf: 'center',
  },
  textbox: {
    backgroundColor: '#e6e6e6',
    color: '#000',
    width: "90%",
  },
  title: {
    color: '#e21538',
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 20,
    margin: 10
  },
  main: {
    backgroundColor: '#e6e6e6',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
