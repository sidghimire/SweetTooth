import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ChatList from '../Screens/ChatList';
import CameraNavigator from '../Navigator/CameraNavigator';
import BottomTabNavigator from '../MainBottomTabNavigaton/BottomTabNavigator';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Bottom=createMaterialTopTabNavigator();


const MaterialTopNavigator=()=> {
return (
    <Bottom.Navigator initialRouteName={'BottomTabNavigator'} screenOptions={{tabBarStyle:{display:'none'},headerShown:false,tabBarShowLabel:false}}>
        <Bottom.Screen name="CameraNavigator" component={CameraNavigator} />
        <Bottom.Screen name="BottomTabNavigator" component={BottomTabNavigator}/>
        <Bottom.Screen name="ChatList" component={ChatList}/>
    </Bottom.Navigator>
);
}

export default  MaterialTopNavigator;

const styles = StyleSheet.create({
container: {
flex:1,
backgroundColor: '#fff',
},
});

