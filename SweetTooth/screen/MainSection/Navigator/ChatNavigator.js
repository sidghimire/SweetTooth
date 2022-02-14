import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import ChatList from '../Screens/ChatList';
import Chat from '../Screens/Chat';
const Stack=createStackNavigator();

function ChatNavigator() {
    return (
    <Stack.Navigator>
        <Stack.Screen name="ChatList" component={ChatList} options={{headerShown:false}}/>
        <Stack.Screen name="Chat" component={Chat} options={{headerShown:false}}/>
    </Stack.Navigator>
    )
}

export default  ChatNavigator;

const styles = StyleSheet.create({
container: {
flex:1,
backgroundColor: '#fff',
},
});
