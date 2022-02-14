import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {signOut,getAuth} from 'firebase/auth'
import {createStackNavigator} from '@react-navigation/stack';

const Stack=createStackNavigator();

function ChatList({navigation}) {
    const auth=getAuth();

return (
<View style={styles.container}>
    <TouchableOpacity style={{backgroundColor:'#e9e9e9',padding:20}} onPress={()=>{navigation.navigate("Chat")}}>
        <Text>Bibs</Text>
    </TouchableOpacity>
</View>);
}

export default  ChatList;

const styles = StyleSheet.create({
container: {
flex:1,
backgroundColor: '#fff',
},
});
