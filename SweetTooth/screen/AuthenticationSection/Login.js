import React,{useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet,TextInput } from 'react-native';

import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

function Login({navigation}) {
    const auth=getAuth();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const createNewAccount=()=>{
        signInWithEmailAndPassword(auth,email,password)
        .then(()=>{
            setEmail('');
            setPassword('');
        })
        .catch(error=>{
            console.log(error);
        })
    }
    return (
    <View style={styles.container}>
        <TextInput style={styles.inputField} placeholder='Email' placeholderTextColor={"#a9a9a9"} value={email} onChangeText={text=>setEmail(text)} />
        <TextInput style={styles.inputField} placeholder='Password' placeholderTextColor={"#a9a9a9"} value={password} onChangeText={text=>setPassword(text)} />
        <TouchableOpacity style={styles.signUpButton} onPress={createNewAccount}>
            <Text style={{color:'#fff',textAlign:'center'}}>
                Login
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButton} onPress={()=>navigation.navigate('Signup')}>
            <Text style={{color:'#fff',textAlign:'center'}}>
                Signup
            </Text>
        </TouchableOpacity>
    </View>);
    }

export default  Login;

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
        height: '100%',
    },
    inputField: {
        padding:10,
        borderWidth:1,
        borderColor:'#000',
        width:'80%',
        alignSelf:'center',
        marginVertical:10,
    },
    signUpButton:{
        backgroundColor:'#000',
        padding:10,
        width:'80%',
        alignSelf:'center',
        marginTop:20

    }
});
