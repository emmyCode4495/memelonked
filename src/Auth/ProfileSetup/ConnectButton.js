// import React from 'react';
// import { TouchableOpacity, Text, StyleSheet } from 'react-native';
// import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
// import { APP_IDENTITY } from '../providers/AuthorizationProvider'; // Adjust path as needed
// import { getPublicKeyFromAddress } from '../../../utils/getPublicKeyFromAddress'; // Adjust path as needed

// export default function ConnectButton({ onConnect }) {
//   // const onPress = async () => {

//   //    let authorizationResult;
     
//   //   await transact(async wallet => {
//   //     const authResult = await wallet.authorize({
//   //       cluster: 'devnet',
//   //       identity: APP_IDENTITY,
//   //     });

//   //     const { accounts, auth_token } = authResult;

//   //     onConnect({
//   //       address: accounts[0].address,
//   //       label: accounts[0].label,
//   //       authToken: auth_token,
//   //       publicKey: getPublicKeyFromAddress(accounts[0].address),
//   //     });
//   //   });
//   // };

//   const onPress = async () => {
//     let authorizationResult;

//     await transact(async wallet => {
//       authorizationResult = await wallet.authorize({
//         cluster: 'devnet',
//         identity: APP_IDENTITY,
//       });
//     });

//     // Call onConnect OUTSIDE transact()
//     if (authorizationResult) {
//       const { accounts, auth_token } = authorizationResult;

//       onConnect({
//         address: accounts[0].address,
//         label: accounts[0].label,
//         authToken: auth_token,
//         publicKey: getPublicKeyFromAddress(accounts[0].address),
//       });
//     }
//   };

  
//   return (
//     <TouchableOpacity style={styles.button} onPress={onPress}>
//       <Text style={styles.buttonText}>Connect Wallet</Text>
//     </TouchableOpacity>
//   );
// }



import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../persistence/AuthContext';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import { APP_IDENTITY } from '../providers/AuthorizationProvider'; // Adjust path as needed
import { getPublicKeyFromAddress } from '../../../utils/getPublicKeyFromAddress'; // Adjust path as needed




export default function ConnectButton({ onConnect }) {
  const { login } = useContext(AuthContext);

  const onPress = async () => {
    await transact(async wallet => {
      const authResult = await wallet.authorize({
        cluster: 'devnet',
        identity: APP_IDENTITY,
      });

      const { accounts, auth_token } = authResult;
      const walletAddress = accounts[0].address;
      const label = accounts[0].label;

      // Try to find user in DB
      try {
        const res = await axios.get(`http://192.168.231.165:5000/api/users/${walletAddress}`);
        
        if (res.data.user) {
          // User exists, log them in
          login(res.data.user); // AuthContext handles persistence
        } else {
          // New user: continue with profile setup
          onConnect({
            address: walletAddress,
            label: label,
            authToken: auth_token,
            publicKey: getPublicKeyFromAddress(walletAddress),
          });
        }
      } catch (err) {
        console.error('Login lookup failed:', err.message);
        // Fallback to registration
        onConnect({
          address: walletAddress,
          label: label,
          authToken: auth_token,
          publicKey: getPublicKeyFromAddress(walletAddress),
        });
      }
    });
  };

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Connect Wallet</Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});