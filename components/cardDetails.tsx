import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // or 'react-native-vector-icons/Ionicons' if not using Expo

export default function CardDetails({route }: any) {
    console.log(route.params); // Log the passed parameters for debugging
  const { data } = route.params; // Destructure the passed parameters
  const [duration, setDuration] = useState('');
  const [caloriesConsumed, setCaloriesConsumed] = useState('');
  const navigation = useNavigation();

  const handleCalculate = () => {
    const dur = parseInt(duration);
    const cal = parseInt(caloriesConsumed);

    if (isNaN(dur) || isNaN(cal)) {
      Alert.alert('Invalid Input', 'Please enter valid numbers for both fields.');
      return;
    }

    const burned = dur * 8; // Simplified: 8 cal per minute

    let message = `You burned approx. ${burned} calories.\n`;
    message += burned > cal
      ? "Great job! You burned more than you consumed. 💪"
      : "Try to exercise a bit more to balance it out. 🔄";

    Alert.alert("Result", message);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Arrow */}
      <View style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color="black" />
      </TouchableOpacity>

      <Text style={styles.header}>Exercise Details</Text>
      </View>

      {/* Animation */}
      <View style={{ width: '100%', alignItems: 'center' }}>
  <Image
    source={data.image}
    style={styles.animation}
    resizeMode="contain"
  />
</View>

      <Text style={styles.title}>{data.title}</Text>
      <Text style={styles.description}>
        {data.description}
      </Text>

      <Text style={styles.label}>Duration (minutes)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={duration}
        onChangeText={setDuration}
        placeholder="e.g. 20"
      />

      <Text style={styles.label}>Calories consumed</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={caloriesConsumed}
        onChangeText={setCaloriesConsumed}
        placeholder="e.g. 180"
      />

      <TouchableOpacity style={styles.button} onPress={handleCalculate}>
        <Text style={styles.buttonText}>Calculate</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  animation: {
    width: '100%',
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
    color: '#666',
  },
  label: {
    fontSize: 16,
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginTop: 5,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#3478f6',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
