import { useState } from "react";
import axios from "axios";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';

const Login = ({ navigation }: any) => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleLogin = async () => {
    console.log('Login button pressed');
    if ( !email || !password) {
      setErrorMessage('All fields are required');
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage('Invalid email format');
      return;
    }
   

    setErrorMessage('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      console.log('login response:', response.data);
      setLoading(false);

      // Redirect to login or home page
      navigation.replace('Home');
    } catch (error: any) {
      console.error('Login error:', error?.response?.data || error.message);
      setLoading(false);
      if (error.response?.data?.msg) {
        setErrorMessage(error.response.data.msg);
      } else {
        setErrorMessage('Login failed. Please try again.');
      }
    }
  };

  return (
    <View style={styles.wrapper}>
    <ImageBackground
            source={require('../assets/LoginBG.jpeg')}
            style={styles.backgroundImage}
            resizeMode="cover"
          >
<View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <View style={styles.formWrapper}>
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? <ActivityIndicator size="small" color="#FFF" /> : <Text style={styles.buttonText}>Login</Text>}
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.linkText}>Don't have an account? Sign up</Text>
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
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: 'white' }, 
  input: { width: '100%', height: 50, borderWidth: 1, padding: 10, marginBottom: 10, backgroundColor: 'white' },
  button: { backgroundColor: '#007BFF', padding: 15, borderRadius: 5, alignItems: 'center', marginTop: 10, width: '100%' },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  formWrapper: { width: '100%', gap: 10 },
  linkText: { color: '#007BFF', marginTop: 10 },
  errorText: { color: 'red', marginBottom: 10 },
});

export default Login;
