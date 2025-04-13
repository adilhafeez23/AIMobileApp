import { NavigationContainer } from '@react-navigation/native';
//@ts-ignore
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/login';
const Stack = createStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Landing" component={Landing} /> */}
        <Stack.Screen name="Login" component={Login} />
        {/* Add other screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}


