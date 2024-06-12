import { View, Text, TouchableOpacity,StyleSheet,TextInput, Alert } from 'react-native'
import React,{useState} from 'react'
const SignUp = ({navigation}) => {
  const[name,setName] = useState("");
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const[confirmPassword,setConfirmPassword] = useState("");

  const clearForm = ()=>{
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  const formSubmit = async()=>{
    if(!name || !email || !password || !confirmPassword) {
      Alert.alert("please fill the form");
      return
    }
    try {
      const res = await fetch('http://192.168.1.2:3001/auth/signup', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username:name,
          password:password,
          email:email,
        }),
      });
      const response = await res.json();
      Alert.alert(response.message);
      navigation.navigate('Login')
      clearForm();
    } catch (error) {
      Alert.alert(error.message)
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
      <Text style={styles.header}>Register</Text>
      <View style={styles.inputWrapper}>
        <Text>Name</Text>
        <TextInput style={styles.input} onChangeText={(e)=>setName(e)} value={name}/>
      </View>
      <View style={styles.inputWrapper}>
        <Text>Email</Text>
        <TextInput style={styles.input} onChangeText={(e)=>setEmail(e)} value={email}/>
      </View>
      <View style={styles.inputWrapper}>
        <Text>Password</Text>
        <TextInput style={styles.input} onChangeText={(e)=>setPassword(e)} value={password}/>
      </View>
      <View style={styles.inputWrapper}>
        <Text>Confirm Password</Text>
        <TextInput style={styles.input} onChangeText={(e)=>setConfirmPassword(e)} value={confirmPassword}/>
      </View>
      <View style={styles.inputWrapper}>
        <TouchableOpacity
            title="Home"
            style={styles.button}
            onPress={formSubmit}
        >
            <Text style={styles.text}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.inputWrapper}>
        <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
        >
            <Text>Already have an account?</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default SignUp

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