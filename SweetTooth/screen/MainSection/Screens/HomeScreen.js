import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

function HomeScreen() {

return (
<View style={styles.container}>
    <StatusBar backgroundColor="#1e1e1e" barStyle="light-content" />
    
</View>);
}

export default  HomeScreen;

const styles = StyleSheet.create({
container: {
flex:1,
backgroundColor: '#fff',
},
});
