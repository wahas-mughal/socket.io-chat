import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import io from 'socket.io-client';

const App = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  useEffect(() => {
    const socket = io('http://192.168.6.238:3000');
    setSocket(socket);
    socket.on('message', msg => {
      setMessages(prev => [...prev, msg]);
    });
    return () => {
      socket.removeListener('message');
    };
  }, []);

  //handler message
  const handleMessage = () => {
    socket.emit('message', message);
    setMessage('');
  };

  const messagesDisplay = messages.map((msg, index) => {
    return <Text key={index}>{msg}</Text>;
  });

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <TextInput
        autoCorrect={true}
        placeholder="send message"
        placeholderTextColor={'#000'}
        value={message}
        onSubmitEditing={handleMessage}
        onChangeText={text => setMessage(text)}
        style={styles.input}
      />
      <View style={{margin: 10}}>{messagesDisplay}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  input: {
    marginTop: 20,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 7,
    height: 55,
    paddingHorizontal: 10,
    color: '#000',
  },
});

export default App;
