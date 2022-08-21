/**
 * Audio Recording component
 */
// Imports
import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

import colors from '../config/colors';

// Component
const AudioRecord = ({ onChangeRecording, style }) => {
  const [recording, setRecording] = useState();

  const startRecording = async () => {
    try {
      const { granted } = await Audio.requestPermissionsAsync();

      if (granted) {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );

        setRecording(recording);
      } else {
        alert('You need to enable the permission for the media library.');
      }
    } catch (error) {
      console.log('Failed to start recording', error);
    }
  };

  const stopRecording = async () => {
    // Stop the recording
    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    // Get the recording URI and pass it to the parent component
    const uri = recording.getURI();
    onChangeRecording(uri);
  };

  const handlePress = () => {
    if (!recording) {
      setRecording(null);
      startRecording();
    } else stopRecording();
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={[styles.container, style]}>
        {!recording && (
          <MaterialCommunityIcons
            color={colors.white}
            name="microphone"
            size={30}
          />
        )}

        {recording && (
          <MaterialCommunityIcons
            color={colors.accent}
            name="record-rec"
            size={30}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 15,
    height: 100,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 100,
  },
});

// Export
export default AudioRecord;
