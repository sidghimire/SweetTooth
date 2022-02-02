import React from 'react';
import { View, Text,StatusBar, TouchableOpacity, StyleSheet } from 'react-native';
import {signOut,getAuth} from 'firebase/auth'
function MainSection() {
    const auth=getAuth();
    const logout=()=>{
        signOut(auth);
    }
return (
<View style={styles.container}>
<StatusBar backgroundColor="#fff" barStyle="dark-content" />

    <Text onPress={logout}>MainSection</Text>
</View>);
}

export default  MainSection;

const styles = StyleSheet.create({
container: {
flex:1,
backgroundColor: '#fff',
},
});
