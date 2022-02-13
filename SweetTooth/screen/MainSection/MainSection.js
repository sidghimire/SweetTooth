import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialTopNavigator from './MaterialTopNavigation/MaterialTopNavigator';



const MainSection=()=> {
    const Stack=createStackNavigator();
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="MaterialTopNavigator" component={MaterialTopNavigator}/>
        </Stack.Navigator>
    );
}
export default MainSection;