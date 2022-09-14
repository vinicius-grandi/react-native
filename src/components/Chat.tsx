import {
  Text,
  TextInput,
  View,
  Button,
  FlatList,
} from 'react-native';
import { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  child,
  set,
  push,
  get,
  onChildAdded,
  DataSnapshot,
} from 'firebase/database';

type Messages = {
  username: string;
  message: string;
};

function Item({ message, username }: Messages) {
  return (
    <View>
      <Text>{username}</Text>
      <Text>{message}</Text>
    </View>
  );
}

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

initializeApp(firebaseConfig);
const dbRef = ref(getDatabase(), 'messages');

export default function Chat() {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [initialMessages, setInitialMessages] = useState<Messages[]>([]);
  const [currMessages, setCurrMessages] = useState<Messages[]>([]);

  useEffect(() => {
    if (initialMessages.length > 1) {
      onChildAdded(dbRef, (dc) => {
        const val = dc.val();
        setCurrMessages([...initialMessages, {
          username: val.username,
          message: val.message,
        }]);
      });
    } else {
      const fn = (d: DataSnapshot) => {
        const msgs: Messages[] = [];
        d.forEach((dc) => {
          const val = dc.val();
          msgs.push({
            username: val.username,
            message: val.message,
          });
        });
        setInitialMessages(msgs);
      };
      get(child(dbRef, '/')).then(fn);
    }
  }, [initialMessages]);

  const renderItem = ({ item }: { item: Messages }) => (
    <Item message={item.message} username={item.username} />
  );

  return (
    <View>
      <FlatList data={currMessages} renderItem={renderItem} />
      <Text>Username</Text>
      <TextInput onChangeText={(t) => setUsername(t)} value={username} />
      <Text>Message</Text>
      <TextInput onChangeText={(t) => setMessage(t)} value={message} />
      <Button
        title="Send Message"
        onPress={() => {
          const newMessageRef = push(dbRef);
          set(newMessageRef, {
            username,
            message,
          });
        }}
      />
    </View>
  );
}
