/**
 * Creation screen
 * Modal overlay when creating a new channel
 */
// Imports
import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import * as Progress from 'react-native-progress';
import LottieView from 'lottie-react-native';

import colors from '../config/colors';

// Component
const CreationScreen = ({ onDone, progress = 0, visible = false }) => (
  <Modal visible={visible}>
    <View style={styles.container}>
      {progress < 1 ? (
        <Progress.Bar color={colors.accent} progress={progress} width={200} />
      ) : (
        <LottieView
          autoPlay
          loop={false}
          onAnimationFinish={onDone}
          source={require('../assets/animations/done.json')}
          style={styles.animation}
        />
      )}
    </View>
  </Modal>
);

// Styles
const styles = StyleSheet.create({
  animation: {
    width: 150,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.bgColor,
  },
});

// Export
export default CreationScreen;
