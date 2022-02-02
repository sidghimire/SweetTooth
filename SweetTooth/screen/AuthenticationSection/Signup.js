import React,{useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet,TextInput } from 'react-native';
import { firebaseConfig } from '../../firebase';
import {getAuth,signOut,signInWithRedirect,signInWithPopup,GoogleAuthProvider,FacebookAuthProvider, createUserWithEmailAndPassword} from 'firebase/auth';
import { initializeApp } from 'firebase/app';

function Signup({navigation}) {
    const auth=getAuth();
    auth.languageCode = 'it';
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const google=new GoogleAuthProvider();
    const facebook=new GoogleAuthProvider();
    google.addScope('https://www.googleapis.com/auth/contacts.readonly');
    google.setCustomParameters({
        'login_hint': 'user@example.com'
      });

    const googleSignIn=async()=>{
        await signInWithRedirect(auth,google)
        .then((result)=>{
            console.log(result)
        })
    }
    const facebookSignIn=async()=>{
        await signInWithPopup(auth,facebook);
    }
    const twitterSignIn=()=>{
        alert("Twitter Sign In")
    }
    const createNewAccount=()=>{
        createUserWithEmailAndPassword(auth,email,password)
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
                Sign Up
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButton} onPress={googleSignIn}>
            <Text style={{color:'#fff',textAlign:'center'}}>
                Sign Up With Google
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButton} onPress={facebookSignIn}>
            <Text style={{color:'#fff',textAlign:'center'}}>
                Sign Up With Facebook
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButton} onPress={twitterSignIn}>
            <Text style={{color:'#fff',textAlign:'center'}}>
                Sign Up With Twitter
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButton} onPress={()=>navigation.navigate('Login')}>
            <Text style={{color:'#fff',textAlign:'center'}}>
                Login
            </Text>
        </TouchableOpacity>
    </View>);
    }

export default  Signup;

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
