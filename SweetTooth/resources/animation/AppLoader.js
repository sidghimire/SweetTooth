import React from 'react'
import { View, StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native';

import LottieAnimation from "./loadingAnimation.json"

const AppLoader = () => {
    return (
        <View style={[StyleSheet.absoluteFillObject,styles.container]}>
            <LottieView speed={3} source={LottieAnimation} autoPlay loop />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,1)',
        zIndex:1,
        elevation:100
    }
})

export default AppLoader
