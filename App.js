import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const[isLoggedIn,setIsLoggedIn] = useState(null)
  const Stack = createNativeStackNavigator();

  async function getAuth(){
    const value = await AsyncStorage.getItem('auth');
    setIsLoggedIn(value);
  }
  useEffect(()=>{
    getAuth();
  },[]);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "Home" : "Login"}>
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
