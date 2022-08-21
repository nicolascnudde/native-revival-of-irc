/**
 * Offline Notice
 */
// Imports
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { useNetInfo } from '@react-native-community/netinfo';

import colors from '../config/colors';
import AppText from './AppText';

// Component
const OfflineNotice = () => {
  const netInfo = useNetInfo();

  if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
    return (
      <View style={styles.container}>
        <AppText>No Internet Connection</AppText>
      </View>
    );

  return null;
};

// Styles
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.secondary,
    height: 50,
    justifyContent: 'center',
    position: 'absolute',
    top: Constants.statusBarHeight,
    width: '100%',
    zIndex: 1,
  },
});

// Export
export default OfflineNotice;
