import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './src/Auth/Welcome';
import WalletConnectScreen from './src/Auth/ProfileSetup/WalletConnectScreen';


const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
     <Stack.Navigator 
     screenOptions={{
        headerShown:false
     }}
     >
      <Stack.Screen name="welcome" component={Welcome} />
       <Stack.Screen name="connect" component={WalletConnectScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})