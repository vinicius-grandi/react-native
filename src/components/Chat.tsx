import {
  Text,
  TextInput,
  View,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  set,
  push,
  onChildAdded,
  DataSnapshot,
} from 'firebase/database';

type Messages = {
  username: string;
  message: string;
};

const styles = StyleSheet.create({
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff3e3e',
    alignSelf: 'flex-start',
  },
  message: {
    fontSize: 18,
  },
  line: {
    flexBasis: '100%',
    borderBottomWidth: 1,
  },
  list: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    height: 500,
    maxHeight: 500,
  },
  input: {
    borderWidth: 1,
    padding: 5,
  },
});

function Item({ message, username }: Messages) {
  return (
    <View style={styles.line}>
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.message}>{message}</Text>
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
  const [currMessages, setCurrMessages] = useState<Messages[]>([]);
  const [showScrollToEnd, setShowScrollToEnd] = useState(false);
  const listRef = useRef<FlatList<Messages>>(null);

  useEffect(() => {
    const msgArr: Messages[] = [];
    const fn = (dc: DataSnapshot) => {
      const val = dc.val();
      msgArr.push({
        username: val.username,
        message: val.message,
      });
      setCurrMessages([...currMessages, ...msgArr]);
      setShowScrollToEnd(true);
    };
    onChildAdded(dbRef, fn);
  }, []);

  const renderItem = ({ item }: { item: Messages }) => (
    <Item message={item.message} username={item.username} />
  );

  return (
    <View style={{ flex: 1 }}>
      <View>
        <FlatList
          data={currMessages}
          renderItem={renderItem}
          style={styles.list}
          // contentContainerStyle attribute is used for positioning the list
          contentContainerStyle={{ flex: 0.1 }}
          ref={listRef}
        />
        {showScrollToEnd && (
          <Button
            title="↓"
            color="#a0ff74"
            onPress={() => {
              // FlatList.
              listRef.current?.scrollToEnd();
              setShowScrollToEnd(false);
            }}
          />
        )}
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={{ padding: 10 }}>
          <Text>Username</Text>
          <TextInput onChangeText={(t) => setUsername(t)} value={username} style={styles.input} />
        </View>
        <View style={{ padding: 10 }}>
          <Text>Message</Text>
          <TextInput onChangeText={(t) => setMessage(t)} value={message} style={styles.input} />
        </View>
      </View>
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
