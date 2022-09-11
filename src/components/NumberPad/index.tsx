import { TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  textbox: {
    backgroundColor: '#e6e6e6',
    color: '#000',
    width: '90%',
    textAlign: 'center',
  },
});

function NumberPad({
  handler,
  placeholder,
}: {
  handler: (v: number) => void;
  placeholder: string;
}) {
  return (
    <TextInput
      keyboardType="number-pad"
      style={styles.textbox}
      onChangeText={(t) => handler(Number(t.replace(',', '.')))}
      placeholder={placeholder}
    />
  );
}

export default NumberPad;
