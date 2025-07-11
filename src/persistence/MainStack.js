import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../MainScreens/HomePage';


const Stack = createNativeStackNavigator();


const MainStack = () => {
  return (

     <Stack.Navigator 
     screenOptions={{
        headerShown:false
     }}

     >
        <Stack.Screen name="home" component={HomePage} />
    </Stack.Navigator>
  

  )
}

export default MainStack

const styles = StyleSheet.create({})