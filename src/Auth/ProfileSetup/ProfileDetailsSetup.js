
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, { useState, useContext } from 'react';
import colors from '../../../constants/colors';
import axios from 'axios';
import { AuthContext } from '../../persistence/AuthContext';


const ProfileDetailsSetup = ({ route, navigation }) => {
  const { walletAddress, walletLabel } = route.params;

  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');

  const { login } = useContext(AuthContext);

  const handleSubmit = async () => {
    if (!username || !email) {
      Alert.alert('Error', 'Username and email are required');
      return;
    }

    try {
      const res = await axios.post(
        'http://192.168.231.165:5000/api/users/create-user',
        {
          username,
          email,
          bio,
          walletAddress,
        }
      );

      if (res.data?.message === 'success' || res.status === 201) {
        const userData = res.data.user;
        await login(userData); // 👈 Persist user in context and AsyncStorage
        Alert.alert('Success', 'Profile created');
        navigation.navigate('Home'); // 👈 Navigate to home screen
      }
    } catch (err) {
      console.error(err);

      let errorMessage = 'Could not create user';

      if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.message) {
        errorMessage = err.message;
      }

      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.welcomeText}> setup your </Text>
            <Text style={styles.welcomeText}> profile</Text>
          </View>
          <Pressable style={styles.walletaddress}>
            <Text style={styles.addressText}>{walletAddress}</Text>
          </Pressable>
        </View>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={{
            width: 120,
            height: 150,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
      </View>

      <View>
        <Text style={styles.textInputName}>Username</Text>
        <TextInput
          placeholder="Enter your username"
          style={styles.textInput}
          value={username}
          onChangeText={setUsername}
        />

        <Text style={{ ...styles.textInputName, marginTop: 20 }}>Email</Text>
        <TextInput
          placeholder="Enter your email"
          style={styles.textInput}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Text style={{ ...styles.textInputName, marginTop: 20 }}>Bio</Text>
        <TextInput
          placeholder="Enter bio"
          style={styles.textInput}
          value={bio}
          onChangeText={setBio}
        />
      </View>

      <TouchableOpacity style={styles.continueBtn} onPress={handleSubmit}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileDetailsSetup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontSize: 25,
    color: colors.main,
    fontFamily: 'comicsansbold',
    textTransform: 'uppercase',
  },
  memeText: {
    fontSize: 40,
    color: colors.main,
    fontFamily: 'comicItalicsbold',
    textTransform: 'uppercase',
  },
  secondContainer: {
    marginTop: '25%',
  },
  walletaddress: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    padding: 5,
    borderRadius: 20,
    backgroundColor: '#E38D0B',
  },
  addressText: {
    color: colors.white,
    fontFamily: 'comicsansbold',

  },
  textInput: {
    backgroundColor: '#D9D9D9',
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 20,
    fontSize: 16,
    color: colors.main,
  },
  textInputName: {
    marginLeft: 20,
    fontSize: 18,
    color: colors.black,
  },
  continueBtn: {
    backgroundColor: colors.black,
    padding: 15,
    borderRadius: 30,
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  continueText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: 'comicsansbold',
  },
});