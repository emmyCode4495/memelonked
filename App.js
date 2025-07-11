import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './src/Auth/Welcome';
import WalletConnectScreen from './src/Auth/ProfileSetup/WalletConnectScreen';
import ProfileDetailsSetup from './src/Auth/ProfileSetup/ProfileDetailsSetup';
import HomePage from './src/MainScreens/HomePage';
import { AuthContext, AuthProvider } from './src/persistence/AuthContext';
import RootNavigator from './src/persistence/RootNavigator';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <AuthProvider>
      <NavigationContainer>
           <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
