/**
 * Welcome Screen
 */
// Imports
import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

import { AppButton } from '../components';
import routes from '../navigation/routes';

// Component
const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.buttonContainer}>
        <AppButton
          title="Login"
          onPress={() => navigation.navigate(routes.LOGIN)}
        />

        <AppButton
          title="Register"
          color="secondary"
          onPress={() => navigation.navigate(routes.REGISTER)}
        />
      </View>
    </ImageBackground>
  );
};

// Styles
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    paddingHorizontal: 20,
  },
});

// Export
export default WelcomeScreen;
