// import { Image, StyleSheet, Text, View } from 'react-native';
// import React, { useState, useCallback } from 'react';
// import colors from '../../../constants/colors';
// import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
// import { useAuthorization } from '../providers/AuthorizationProvider';
// import ConnectButton from './ConnectButton';
// import { useConnection } from '../providers/ConnectionProvider';
// import DisconnectWallet from './DisconnectWallet';

// const WalletConnectScreen = () => {
//   const { connection } = useConnection();
//   const [message, setMessage] = useState('');
//   const [authorization, setAuthorization] = useState(null);

//   return (
//     <View style={styles.container}>
//       <View style={styles.secondContainer}>
//         <Text style={styles.welcomeText}> connect wallet</Text>
//         <Image
//           source={require('../../../assets/images/solanaicon.png')}
//           style={{
//             width: 300,
//             height: 300,
//             resizeMode: 'contain',
//             alignSelf: 'center',
//           }}
//         />
//         {authorization === null ? (
//           <ConnectButton
//   onConnect={async authorization => {
//     setAuthorization(authorization);
//     navigation.navigate('usersetup', {
//       walletAddress: authorization.address,
//     });
//   }}
// />
//         ) : (
//           <DisconnectWallet
//             authorization={authorization}
//             onDisconnect={() => {
//               setAuthorization(null);
//             }}
//           />
//         )}
//       </View>
//     </View>
//   );
// };

// export default WalletConnectScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   welcomeText: {
//     fontSize: 30,
//     color: colors.main,
//     fontFamily: 'comicsansbold',
//     textTransform: 'uppercase',
//     marginTop: 20,
//   },
//   secondContainer: {
//     marginTop: '20%',
//     justifyContent: 'flex-end',
//     marginLeft: 20,
//   },
//   touchStyle: {
//     alignItems: 'center',
//     width: '70%',
//     alignSelf: 'center',
//     marginTop: 50,
//     padding: 20,
//     borderRadius: 30,
//     backgroundColor: '#FCDB00',
//   },
//   getStarted: {
//     textTransform: 'uppercase',
//     color: colors.white,
//     fontFamily: 'comicsansbold',
//     fontSize: 20,
//   },
// });
import React, { useState, useContext } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import colors from '../../../constants/colors';
import { useConnection } from '../providers/ConnectionProvider';
import ConnectButton from './ConnectButton';
import DisconnectWallet from './DisconnectWallet';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../persistence/AuthContext';
import axios from 'axios';

const WalletConnectScreen = () => {
  const { connection } = useConnection();
  const [authorization, setAuthorization] = useState(null);
  const navigation = useNavigation();
  const { login } = useContext(AuthContext); // Using login from AuthContext

  const handleWalletConnect = async (auth) => {
    setAuthorization(auth);

    try {
      // Encode the wallet address for safe use in URL
      const encodedWallet = encodeURIComponent(auth.address);

      // 🔥 Update to match Firestore query route (query param)
      const res = await axios.get(
        `http://192.168.231.165:5000/api/users?wallet=${encodedWallet}`
      );

      if (res.data?.user) {
        // User found — log them in
        login(res.data.user);
    
      } else {
        // User not found — send to profile setup
        navigation.navigate('usersetup', {
          walletAddress: auth.address,
          walletLabel: auth.label,
        });
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to check wallet. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => handleWalletConnect(authorization)}
          disabled={!authorization}
          style={[
            styles.continueButton,
            { backgroundColor: authorization ? '#000' : '#ccc' },
          ]}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.secondContainer}>
        <Text style={styles.welcomeText}>connect wallet</Text>
        <Image
          source={require('../../../assets/images/solanaicon.png')}
          style={{
            width: 300,
            height: 300,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
        {authorization === null ? (
          <ConnectButton onConnect={handleWalletConnect} />
        ) : (
          <DisconnectWallet
            authorization={authorization}
            onDisconnect={() => setAuthorization(null)}
          />
        )}
      </View>
    </View>
  );
};


export default WalletConnectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBar: {
    marginTop: 50,
    paddingHorizontal: 20,
    alignItems: 'flex-end',
  },
  continueButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  continueText: {
    color: '#fff',
    fontSize: 16,
  },
  welcomeText: {
    fontSize: 30,
    color: colors.main,
    fontFamily: 'comicsansbold',
    textTransform: 'uppercase',
    marginTop: 20,
  },
  secondContainer: {
    marginTop: '15%',
    justifyContent: 'flex-end',
    marginLeft: 20,
  },
});
