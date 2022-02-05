import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePage from '../Screens/HomeScreen';
import ChatList from '../Screens/ChatList';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import home from '../../../resources/images/Icon/home.png';
const Bottom=createBottomTabNavigator();


const BottomTabNavigator=()=> {
return (
    <Bottom.Navigator screenOptions={{headerShown:false,tabBarShowLabel:false}}>
        <Bottom.Screen name="HomePage" component={HomePage} options={{tabBarIcon:()=>{return <Icon name='home' size={24} color={'#000'} />}}}/>
        <Bottom.Screen name="ChatList" component={ChatList} />
    </Bottom.Navigator>
);
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
container: {
flex:1,
backgroundColor: '#fff',
},
});

