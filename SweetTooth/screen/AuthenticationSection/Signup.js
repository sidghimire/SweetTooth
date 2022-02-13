import React,{useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet,TextInput,Image } from 'react-native';
import { firebaseConfig } from '../../firebase';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getAuth,signOut,signInWithRedirect,signInWithPopup,GoogleAuthProvider,FacebookAuthProvider, createUserWithEmailAndPassword} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import BackgroundImage1 from "../../resources/images/UI/maskGroup2.png";
import Croissant from "../../resources/images/UI/Image3.png";
import BackgroundMask1 from "../../resources/images/UI/ellipse2.png";
import {doc,collection,setDoc,addDoc,getDoc,getFirestore} from 'firebase/firestore/lite';

function Signup({navigation}) {
    const auth=getAuth();
    const db=getFirestore();
    auth.languageCode = 'it';
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [username,setUsername]=useState('');
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
        .then(async(result)=>{
            console.log(result.user.uid)
            let data={
                username:username,
                email:email,
                uid:result.user.uid,
                date:Date.now()
            }
            const collectionDB=collection(db,'users');
            await addDoc(collectionDB,data)
            .then(()=>{
                setEmail('');
                setPassword('');
            })

           
        })
        .catch(error=>{
            console.log(error);
        })
    }
    return (
    <View style={styles.container}>
        <View style={{marginBottom:30,marginTop:-100}}>
            <Image source={BackgroundImage1} style={styles.backgroundImage}/>
            <Image source={BackgroundMask1} style={[styles.backgroundImage,{position:'absolute',opacity:0.6}]}/>
        </View>
        {/*<Image source={Croissant} style={{position:'absolute',bottom:-30,left:-20}}/>*/}

        <TextInput style={styles.inputField} placeholder='Username' placeholderTextColor={"#a9a9a9"} value={username} onChangeText={text=>setUsername(text)} />
        <TextInput style={styles.inputField} placeholder='Email' placeholderTextColor={"#a9a9a9"} value={email} onChangeText={text=>setEmail(text)} />
        <TextInput style={styles.inputField} placeholder='Password' placeholderTextColor={"#a9a9a9"} value={password} onChangeText={text=>setPassword(text)} />
        <TouchableOpacity style={styles.signUpButton} onPress={createNewAccount}>
            <Text style={{color:'#fff',textAlign:'center'}}>
                Sign Up
            </Text>
        </TouchableOpacity>
        <Text style={{textAlign:"center",fontSize:12,marginTop:30,marginBottom:20}}>OR</Text>
        <View style={{flexDirection:'row',alignSelf:'center'}}>
            <Icon name="google" size={25} color="#E34133" style={{marginTop:10,marginHorizontal:5}}/>
            <Icon name="facebook" size={25} color="#3b5998" style={{marginTop:10,marginHorizontal:5}}/>
            <Icon name="twitter" size={25} color="#1C9CEA" style={{marginTop:10,marginHorizontal:5}}/>
        </View>
        <View style={{flexDirection:'row',alignSelf:'center',marginTop:30}}>
            <Text style={{textAlign:"center",fontSize:12}}>Already have an account?</Text>
            <Text style={{color:'#4EA1D1',marginLeft:10,fontSize:12,textDecorationLine:'underline'}} onPress={()=>navigation.navigate("Login")}>
                Login
            </Text>
            
        </View>
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
        borderBottomWidth:1,
        borderColor:'#909090',
        width:'80%',
        alignSelf:'center',
        marginVertical:10,
    },
    signUpButton:{
        backgroundColor:'#4EA1D1',
        borderRadius:50,
        padding:10,
        width:'80%',
        alignSelf:'center',
        marginTop:20,
        paddingVertical:15

    },
    backgroundImage:{
        width:'100%',
        height:400,
        resizeMode:'cover',
        

    }
});
