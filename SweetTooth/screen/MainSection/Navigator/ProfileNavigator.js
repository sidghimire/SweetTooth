import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Profile from '../Screens/Profile';
import EditProfile from '../Screens/EditProfile';
const Stack=createStackNavigator();

function ProfileNavigator() {
    return (
    <Stack.Navigator>
        <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}}/>
        <Stack.Screen name="EditProfile" component={EditProfile} options={{headerShown:true}}/>
    </Stack.Navigator>
    )
}

export default  ProfileNavigator;

const styles = StyleSheet.create({
container: {
flex:1,
backgroundColor: '#fff',
},
});
