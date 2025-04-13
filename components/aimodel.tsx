import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const AIModal = ({ onClose }: any) => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Hi! How can I help you?', sender: 'bot' },
  ]);
  const [input, setInput] = useState('');
  const API_URL = 'https://3e7b-34-125-187-66.ngrok-free.app/generate/';

  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    const loadingMessageId = (Date.now() + 1).toString();
    let dotState = '.';

    setMessages((prev) => [
      ...prev,
      { id: loadingMessageId, text: dotState, sender: 'bot' },
    ]);

    typingIntervalRef.current = setInterval(() => {
      dotState = dotState.length >= 5 ? '.' : dotState + '.';
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessageId ? { ...msg, text: dotState } : msg
        )
      );
    }, 500);

    try {
      const res = await axios.post(
        API_URL,
        { prompt: input },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessageId
            ? { ...msg, text: res.data.response }
            : msg
        )
      );
    } catch (error) {
      console.error(error);
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingMessageId
            ? { ...msg, text: 'Error connecting to AI.' }
            : msg
        )
      );
    } 
  };

  const renderItem = ({ item }: any) => {
    const isUser = item.sender === 'user';
    return (
      <View
        style={[
          styles.messageContainer,
          isUser ? styles.userMessage : styles.botMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI Fitness Assistant</Text>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="close" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatArea}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={input}
          onChangeText={setInput}
          placeholder="Write a message"
        />
        <TouchableOpacity onPress={handleSend}>
          <Ionicons name="send" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    paddingHorizontal: 20,
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  chatArea: {
    padding: 15,
    flexGrow: 1,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    marginVertical: 6,
    borderRadius: 20,
  },
  userMessage: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },
  botMessage: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
  },
  messageText: {
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopColor: '#eee',
    borderTopWidth: 1,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
});

export default AIModal;
