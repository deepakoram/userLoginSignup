import { View, Text, TouchableOpacity,StyleSheet,TextInput } from 'react-native'
import React,{useState, Alert} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const formSubmit = async()=>{
    if(!email || !password){
      Alert.alert("please fill the form");
      return
    }
    try {
      const res = await fetch('http://192.168.1.2:3001/auth/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email:email,
          password:password,
        }),
      });
      const response = await res.json();
      if(response.token){
        await AsyncStorage.setItem('auth', response.token);
        navigation.navigate('Home')
      }else{
        Alert.alert('Wrong credentials')
      }
    } catch (error) {
      Alert.alert("error")
    }
  }
  return (
    <View style={styles.container}>
      {/* <TouchableOpacity
        title="Home"
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text>Home</Text>
      </TouchableOpacity> */}
      <Text style={styles.header}>Login</Text>
      <View style={styles.inputWrapper}>
        <Text>Email</Text>
        <TextInput style={styles.input} onChangeText={(e)=>setEmail(e)} value={email}/>
      </View>
      <View style={styles.inputWrapper}>
        <Text>Password</Text>
        <TextInput style={styles.input} onChangeText={(e)=>setPassword(e)} value={password}/>
      </View>
      <View style={styles.inputWrapper}>
        <TouchableOpacity
            title="Home"
            style={styles.button}
            onPress={formSubmit}
        >
            <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputWrapper}>
        <TouchableOpacity
            onPress={() => navigation.navigate('SignUp')}
        >
            <Text>Don't have an account?</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login


const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    text: {
        color:"white",
        fontSize:20
    },
    header:{
        fontSize:40
    },
    button: {
      width:100,
      padding:5,
      alignItems:"center",
      justifyContent:"center",
      backgroundColor:"#0a5663",
      borderRadius:5
    },
    inputWrapper:{
        marginTop: 25
    },
    input: {
        borderWidth: 1,
        borderColor: "grey",
        borderRadius:5,
        width:270,
        height:50,
        paddingLeft:7,
        paddingRight:7
    }
  })