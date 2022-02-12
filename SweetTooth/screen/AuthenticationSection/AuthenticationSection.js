import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Signup from './Signup';
import Login from './Login';
const Stack=createStackNavigator();
const AuthenticationSection = () => {
    
    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
            <Stack.Screen name="Signup" component={Signup} options={{headerShown:false}} />
            
        </Stack.Navigator>
    )       
}
export default AuthenticationSection;
/*

    */