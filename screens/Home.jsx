import { View, Text, Button,StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import React,{useEffect,useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
const Home = ({navigation}) => {
  const[user,setUser] = useState("");
  async function getAuth(){
    const value = await AsyncStorage.getItem('auth');
    getUser(value);
  }

  function getUser(auth){
    fetch('http://192.168.1.2:3001/protected/hello', {
      headers: {Authorization: `Bearer ${auth}`}
    })
       .then(resp => resp.json())
       .then(json => setUser(json))
  }
  

  const logoutHandle = async()=>{
    await AsyncStorage.removeItem("auth")
    navigation.replace('Login');
  }
useEffect(()=>{
  getAuth()
},[])
  return (
    <SafeAreaView style={styles.conatiner}>
    <View>
      <Text style={{color:"black",marginBottom:100, fontSize:20}}>{user.message}</Text>
      <Button title='logout' onPress={logoutHandle} />
    </View>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  conatiner:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  }
})