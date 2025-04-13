import { useState } from "react";
import axios from "axios";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';

const Signup = ({ navigation }: any) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleSignUp = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setErrorMessage('All fields are required');
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage('Invalid email format');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    setErrorMessage('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        username: `${firstName} ${lastName}`,
        email,
        password,
      });

      console.log('Signup response:', response.data);
      setLoading(false);

      // Redirect to login or home page
      navigation.replace('Login');
    } catch (error: any) {
      console.error('Signup error:', error?.response?.data || error.message);
      setLoading(false);
      if (error.response?.data?.msg) {
        setErrorMessage(error.response.data.msg);
      } else {
        setErrorMessage('Signup failed. Please try again.');
      }
    }
  };

  return (
    <View style={styles.wrapper}>
        <ImageBackground
                source={require('../assets/SignupBG.jpeg')}
                style={styles.backgroundImage}
                resizeMode="cover"
              >
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <TextInput style={styles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName} />
      <TextInput style={styles.input} placeholder="Last Name" value={lastName} onChangeText={setLastName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
      <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={loading}>
        {loading ? <ActivityIndicator size="small" color="#FFF" /> : <Text style={styles.buttonText}>Sign Up</Text>}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
    </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { width: '100%', height: 50, borderWidth: 1, padding: 10, marginBottom: 10, backgroundColor: 'white' },
  button: { backgroundColor: '#007BFF', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 10, width: '100%' },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  linkText: { color: '#007BFF', marginTop: 10 },
  errorText: { color: 'red', marginBottom: 10 },
});

export default Signup;
