import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {signOut,getAuth} from 'firebase/auth'

function ChatList() {
    const auth=getAuth();

return (
<View style={styles.container}>
    <Text style={{color:'#000'}} onPress={()=>{signOut(auth)}}>Log Out</Text>
</View>);
}

export default  ChatList;

const styles = StyleSheet.create({
container: {
flex:1,
backgroundColor: '#fff',
},
});
