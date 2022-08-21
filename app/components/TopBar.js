/**
 * Top Bar component
 * Used instead of the headerShown prop in the StackNavigators
 */
// Imports
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { AppText, AppButton } from '.';
import colors from '../config/colors';

// Component
const TopBar = ({ avatar, image, title, onPress, style }) => {
  return (
    <View style={[styles.topContainer, style]}>
      {image && <Image style={styles.image} source={{ uri: image ? image : avatar }} />}

      <AppText style={styles.title}>{title}</AppText>

      {onPress && (
        <AppButton title="+" onPress={onPress} style={styles.button} />
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  topContainer: {
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: -15,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 15,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  }
});

// Export
export default TopBar;
