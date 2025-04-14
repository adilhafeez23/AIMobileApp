import { NavigationContainer } from '@react-navigation/native';
//@ts-ignore
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/home';
import ExerciseDetails from './components/exercisedetails';
import CardDetails from './components/cardDetails';
const Stack = createStackNavigator();
import { Provider } from 'react-redux';
import store from './store/index';

export default function App() {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Landing" component={Landing} /> */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={Signup} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ExerciseDetails" component={ExerciseDetails} />
        <Stack.Screen name="CardDetails" component={CardDetails} />

        {/* Add other screens here */}
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}


