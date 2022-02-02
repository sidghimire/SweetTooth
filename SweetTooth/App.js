import React,{useState} from 'react';
import {Text, View, StyleSheet,StatusBar, Image, TouchableOpacity} from 'react-native';
import { firebaseConfig } from './firebase';
import {initializeApp} from 'firebase/app'
import {getAuth,onAuthStateChanged} from 'firebase/auth'
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
const Stack=createStackNavigator();
import AuthenticationSection from './screen/AuthenticationSection/AuthenticationSection';
import MainSection from './screen/MainSection/MainSection';
const App=()=>{
    const [loggedIn,setLoggedIn]=useState(false);
    const app=initializeApp(firebaseConfig);
    const auth=getAuth(app);
    onAuthStateChanged(auth,(user)=>{
        if(user){
            setLoggedIn(true)
        }else{
            setLoggedIn(false)

        }
    })
    
    return(
        <NavigationContainer>
            <Stack.Navigator>
                {loggedIn?
                <Stack.Screen name="MainSection" component={MainSection} options={{headerShown:false}}/>
                :
                <Stack.Screen name="AuthenticationSection" component={AuthenticationSection} options={{headerShown:false}}/>
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
    
}

export default App;