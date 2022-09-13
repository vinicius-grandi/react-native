import { Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDE6K_eS2vGcPP6MkJgK2_ZblKb_9EBua4',
  authDomain: 'ct-ordo-realitas.firebaseapp.com',
  databaseURL: 'https://ct-ordo-realitas-default-rtdb.firebaseio.com',
  projectId: 'ct-ordo-realitas',
  storageBucket: 'ct-ordo-realitas.appspot.com',
  messagingSenderId: '62300642308',
  appId: '1:62300642308:web:9ba6399d68e0cc491ba951',
  measurementId: 'G-3L9PCJBCX4',
};

const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase(), 'user');

export default function Chat() {
  const [val, setVal] = useState('teste');
  useEffect(() => {
    try {
      onValue(dbRef, (snapshot) => {
        console.log(snapshot.toJSON());
      });
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <View>
      <Text>{val}</Text>
    </View>
  );
}
