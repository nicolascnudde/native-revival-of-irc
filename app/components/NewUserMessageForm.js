/**
 * New message form
 */
// Imports
import React, { useState } from 'react';
import {
  Alert,
  Keyboard,
  StyleSheet,
  View,
} from 'react-native';
import * as Yup from 'yup';
import { addDoc, collection } from 'firebase/firestore';

import colors from '../config/colors';
import AppButton from './AppButton';
import Icon from './Icon';
import CameraInput from './CameraInput';
import {
  AppForm,
  AppFormAudioRecording,
  AppFormField,
  AppFormImagePicker,
  SubmitButton,
} from './forms';
import { useAuth } from '../firebase/auth';
import useLocation from '../hooks/useLocation';
import { db } from '../firebase/firebase';
import { useStorage } from '../firebase/useStorage';

// Validation schema
const validationSchema = Yup.object().shape({
  text: Yup.string().required().min(1).label('Message'),
  image: Yup.string().nullable(),
  location: Yup.object()
    .shape({
      latitude: Yup.number().required().min(-90).max(90),
      longitude: Yup.number().required().min(-180).max(180),
    })
    .nullable(),
  recording: Yup.string().nullable(),
});

// Component
const NewUserMessageForm = ({ profile }) => {
  const [toggle, setToggle] = useState(false);

  // Get the current user
  const { user } = useAuth();

  // Use the useLocation hook to get the location in case the user wants to share their location
  const location = useLocation();

  const handleSubmit = async (message, { resetForm }) => {
    try {
      // Create a new channel document in the messages collection
      Keyboard.dismiss();

      // Call the useStorage hook to upload the image to firebase storage
      const storageImage = message.image
        ? await useStorage(message.image)
        : null;
      const storageRecording = message.recording
        ? await useStorage(message.recording, 'recordings')
        : null;

      const result = await addDoc(collection(db, 'messages'), {
        text: message.text,
        image: message.image ? storageImage : null,
        location:
          // Only set the location if the user has clicked the 'Share Location' button
          toggle
            ? {
                latitude: location.latitude,
                longitude: location.longitude,
              }
            : null,
        recording: message.recording ? storageRecording : null,
        fromUser: user.uid,
        toUser: profile.id,
        createdAt: Date.now(),
      });

      resetForm();

      return result;
    } catch (error) {
      // Handle the error
      Alert.alert('Error', error.message);
    }
  };

  const handleShareLocation = () => {
    setToggle(!toggle);

    !toggle ? Alert.alert('Location sharing', 'Location sharing is on!') : null;
  };

  return (
    <AppForm
      initialValues={{
        text: '',
        image: null,
        location: null,
        recording: null,
      }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <View style={styles.container}>
        <AppFormImagePicker name="image" style={styles.image} />

        <AppFormAudioRecording name="recording" style={styles.recording} />

        <AppButton
          IconComponent={<Icon name="pin" backgroundColor={colors.primary} />}
          style={styles.button}
          onPress={() => handleShareLocation()}
        />

        <SubmitButton
          IconComponent={
            <Icon name="send" size={50} backgroundColor={colors.secondary} />
          }
          style={styles.submitButton}
        />
      </View>

      <AppFormField name="text" placeholder="Write a message..." />
    </AppForm>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    width: 50,
    height: 50,
  },
  recording: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  button: {
    width: 50,
    height: 50,
    padding: 0,
    marginVertical: 0,
    marginLeft: 10,
  },
  submitButton: {
    width: 75,
    height: 50,
    marginVertical: 0,
    backgroundColor: colors.secondary,
    marginLeft: 'auto',
  },
});

// Export
export default NewUserMessageForm;
