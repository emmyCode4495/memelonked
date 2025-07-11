import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';

export default function DisconnectWallet({ onDisconnect, authorization }) {
  const onPress = async () => {
    await transact(async wallet => {
      await wallet.deauthorize({
        auth_token: authorization.authToken,
      });
      onDisconnect();
    });
  };

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Disconnect Wallet</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ff4444',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
