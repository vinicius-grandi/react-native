import { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
} from 'react-native';
import NumberPad from '../NumberPad';

export const styles = StyleSheet.create({
  title: {
    color: '#e21538',
    textTransform: 'uppercase',
    fontWeight: '700',
    fontSize: 20,
    margin: 10,
  },
});

interface Person {
  height: number;
  weight: number;
  calculateBmi: () => number;
}

function Form() {
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
    },
  });
  const handleHeight = (val: number) => {
    setPerson({ ...person, height: val });
  };

  const handleWeight = (val: number) => {
    setPerson({ ...person, weight: val });
  };
  return (
    <View style={{ alignItems: 'center' }}>
      <Text>Altura</Text>
      <NumberPad handler={handleHeight} placeholder="ex: 1.72" />
      <Text>Peso</Text>
      <NumberPad handler={handleWeight} placeholder="ex: 60" />
      <View style={{ margin: 10 }}>
        <Button
          title="Calcular"
          color="#e21538"
          onPress={() => {
            setRes(person.calculateBmi());
          }}
        />
      </View>
      {res !== 0 && <Text style={styles.title}>{res}</Text>}
    </View>
  );
}

export default Form;
