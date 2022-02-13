import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomePage from '../Screens/HomeScreen';
import ChatList from '../Screens/ChatList';
import ProfileNavigator from '../Navigator/ProfileNavigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Camera from '../CameraModule/Camera';
import MaterialTopNavigator from '../MaterialTopNavigation/MaterialTopNavigator';
const Bottom = createBottomTabNavigator();

const CustomHeader = ({navigation}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#746ac2', '#4e95d1', '#43cecb']}
      style={{flexDirection: 'row', width: '100%', padding: 13}}>
      <Icon onPress={()=>navigation.navigate('CameraNavigator')} name="camera" style={{marginRight:10}} size={30} color={'#fff'} />
      <Text style={{fontSize: 20, color: '#fff',justifyContent:'center', fontWeight: 'bold'}}>
        SweetTooth
      </Text>
      <View style={{flexDirection: 'row', marginLeft: 'auto'}}>
        <Icon
          name="magnify"
          size={30}
          style={{alignSelf: 'flex-end', marginHorizontal: 25}}
          color={'#fff'}
        />
        <Icon
          name="chat-outline"
          size={30}
          style={{alignSelf: 'flex-end', marginHorizontal: 5}}
          color={'#fff'}
        />
      </View>
    </LinearGradient>
  );
};

const BottomTabNavigator = ({navigation}) => {
  return (
    <Bottom.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarBackground: () => (
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#746ac2', '#4e95d1', '#43cecb']}
            style={{height: 70}}
          />
        ),
      }}>
      <Bottom.Screen
        name="HomePage"
        component={HomePage}
        options={{
          header: () => null,
          headerShown: true,
          header: () => <CustomHeader navigation={navigation} />,
          tabBarIcon: () => {
            return <Icon name="home" size={24} color={'#fff'} />;
          },
        }}
      />
      <Bottom.Screen
        name="Heart"
        component={ChatList}
        options={{
          header: () => null,
          headerShown: true,
          header: () => <CustomHeader />,
          tabBarIcon: () => {
            return <Icon name="heart" size={24} color={'#fff'} />;
          },
        }}
      />
      <Bottom.Screen
        name="Bag"
        component={ChatList}
        options={{
          header: () => null,
          headerShown: true,
          header: () => <CustomHeader />,
          tabBarIcon: () => {
            return <Icon name="bag-personal" size={24} color={'#fff'} />;
          },
        }}
      />
      <Bottom.Screen
        name="User"
        component={ProfileNavigator}
        options={{
          headerShown: false,
          tabBarIcon: () => {
            return <Icon name="account" size={24} color={'#fff'} />;
          },
        }}
      />
    </Bottom.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
