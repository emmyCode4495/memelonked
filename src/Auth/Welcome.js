import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import colors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {

    const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={{ width: 85, height: 85, resizeMode: 'contain' }}
        />
        <Text style={styles.welcomeText}> Welcome to</Text>
        <Text style={styles.memeText}>memelonked!</Text>
        <Text style={{ ...styles.ultiText, marginTop: 20 }}>
          The ultimate play ground that{' '}
        </Text>
        <Text style={styles.ultiText}>lets you Roast and Earn</Text>
        <Image
          source={require('../../assets/images/recImage.png')}
          style={{
            width: 200,
            height: 200,
            resizeMode: 'contain',
            marginTop: 50,
          }}
        />
      </View>
      <TouchableOpacity style={styles.touchStyle}
      onPress={()=>navigation.navigate('connect')}
      >
        <Text style={styles.getStarted}>get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontSize: 30,
    color: colors.main,
    fontFamily: 'comicintalics',
    textTransform: 'uppercase',
    marginTop: 20,
  },
  memeText: {
    fontSize: 45,
    color: colors.main,
    fontFamily: 'comicItalicsbold',
    textTransform: 'uppercase',
  },
  secondContainer: {
    marginTop: '25%',
    alignItems: 'center',
  },
  ultiText: {
    fontSize: 20,
    lineHeight: 30,
    color: '#858282',
  },
  touchStyle: {
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
    marginTop: 50,
    padding: 20,
    borderRadius: 30,
    backgroundColor: '#FCDB00',
  },
  getStarted: {
    textTransform: 'uppercase',
    color: colors.white,
    fontFamily: 'comicsansbold',
    fontSize: 20,
  },
});
