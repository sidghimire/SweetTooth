import React,{useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet,TextInput,Image } from 'react-native';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import BackgroundImage1 from "../../resources/images/UI/image1.png";
import BackgroundMask1 from "../../resources/images/UI/Path2.png";
import BackgroundMask2 from "../../resources/images/UI/Path3.png";
import BackgroundImage2 from "../../resources/images/UI/Image4.png";

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
        <View style={{marginBottom:20}}>
            <Image source={BackgroundMask2} style={[{width:'100%',height:343,position:'absolute',opacity:1}]}/>
            <Image source={BackgroundImage1} style={styles.backgroundImage}/>
            <Image source={BackgroundMask1} style={[styles.backgroundImage,{position:'absolute',opacity:0.6}]}/>
        </View>

        <TextInput style={styles.inputField} placeholder='Enter Email' placeholderTextColor={"#a9a9a9"} value={email} onChangeText={text=>setEmail(text)} />
        <TextInput style={styles.inputField} placeholder='Password' placeholderTextColor={"#a9a9a9"} value={password} onChangeText={text=>setPassword(text)} />
        <TouchableOpacity style={{alignSelf:'flex-end',marginRight:"10%",marginVertical:10}}>
                <Text>Forgot Password?</Text>
            </TouchableOpacity>
        <TouchableOpacity style={styles.signUpButton} onPress={createNewAccount}>
            <Text style={{color:'#fff',textAlign:'center'}}>
                Login
            </Text>
        </TouchableOpacity>
        <Text style={{textAlign:"center",fontSize:12,marginTop:30,marginBottom:20}}>OR</Text>
        <View style={{flexDirection:'row',alignSelf:'center'}}>
            <Icon name="google" size={25} color="#E34133" style={{marginTop:10,marginHorizontal:5}}/>
            <Icon name="facebook" size={25} color="#3b5998" style={{marginTop:10,marginHorizontal:5}}/>
            <Icon name="twitter" size={25} color="#1C9CEA" style={{marginTop:10,marginHorizontal:5}}/>
        </View>
        <View style={{flexDirection:'row',alignSelf:'center',marginTop:60}}>
            <Text style={{textAlign:"center",fontSize:12}}>Don't have an account?</Text>
            <Text style={{color:'#4EA1D1',marginLeft:10,fontSize:12,textDecorationLine:'underline'}} onPress={()=>navigation.navigate("Signup")}>
                Sign Up
            </Text>
            
        </View>
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
        height:330,

    }
});
