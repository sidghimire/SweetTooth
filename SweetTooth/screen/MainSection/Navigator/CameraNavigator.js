import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import Camera from '../CameraModule/Camera';
import UploadPhoto from "../Screens/UploadPhoto";
const Stack=createStackNavigator();


function CameraNavigator() {
return (
    <Stack.Navigator initialRouteName={'Camera'}>
        <Stack.Screen name="Camera" component={Camera} options={{headerShown:false}}/>
        <Stack.Screen name="UploadPhoto" component={UploadPhoto} options={{headerTitle:""}}/>
    </Stack.Navigator>
)
}

export default  CameraNavigator;

const styles = StyleSheet.create({
container: {
flex:1,
backgroundColor: '#fff',
},
});
