/**
 * Activity Indicator component
 */
// Imports
import React, { useEffect, useRef } from 'react';
import LottieView from 'lottie-react-native';
import { View, StyleSheet } from 'react-native';

// Component
const ActivityIndicator = ({ visible = false }) => {
  if (!visible) return null;

  // Autoplay didn't work so added a ref to the animation
  const animation = useRef();
  useEffect(() => {
    animation.current.play();
  }, []);

  return (
    <View style={styles.overlay}>
      <LottieView ref={animation}
        autoPlay
        loop
        source={require('../assets/animations/loading.json')}
        style={styles.animation}
      />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  animation: {
    width: 200,
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
});

// Export
export default ActivityIndicator;
