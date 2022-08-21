import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { AppButton } from '.';

const AudioPlayback = ({ recordingUri }) => {
  const [sound, setSound] = useState();

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync({ uri: recordingUri });
    setSound(sound);

    // Play the sound
    await sound.playAsync();
  };

  useEffect(() => {
    return sound
      ? () => {
          // Unload the sound from memory
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <AppButton title="Play Voice Message" onPress={playSound} style={styles.button} />
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: 225,
    marginBottom: 0,
  }
});

export default AudioPlayback;
