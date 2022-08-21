/**
 * Channel Edit screen
 * The screen for creating a new channel
 */
// Imports
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';
import { addDoc, collection } from 'firebase/firestore';
import * as Notifications from 'expo-notifications';
import { ref, getDownloadURL } from 'firebase/storage';

import { Screen } from '../components';
import {
  AppForm,
  AppFormField,
  AppFormImagePicker,
  SubmitButton,
} from '../components/forms';
import CreationScreen from './CreationScreen';
import useLocation from '../hooks/useLocation';
import { db, storage } from '../firebase/firebase';
import { useAuth } from '../firebase/auth';
import routes from '../navigation/routes';
import { useStorage } from '../firebase/useStorage';
import TopBar from '../components/TopBar';

// Validation schema
const validationSchema = Yup.object().shape({
  image: Yup.string().nullable(),
  title: Yup.string()
    .required()
    .max(20)
    .matches(
      /^[a-zA-Z0-9!@$&()`.+,/"-]*$/,
      'Please remove the hashtag, it will be created automatically ;)'
    )
    .label('Title'),
  description: Yup.string().required().max(100).label('Description'),
});

// Component
const ChannelEditScreen = ({ navigation }) => {
  // Get the location through the useLocation hook
  const location = useLocation();

  // Variables used to display the CreationScreen while creating a new channel
  const [createVisible, setCreateVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  // Get the current user
  const { user } = useAuth();

  // Handle the form submit
  const handleSubmit = async (channel, { resetForm }) => {
    try {
      // Call the useStorage hook to upload the image to firebase storage
      const storageImage = channel.image ? await useStorage(channel.image) : null;

      const avatarsArr = ['cat', 'crab', 'frog', 'dog', 'rabbit']
      const randomAvatar = avatarsArr[Math.floor(Math.random() * avatarsArr.length)];
      const avatarUrl = await getDownloadURL(ref(storage, `avatars/${randomAvatar}.png`));

      // Set an overlay with a progress bar and complete animation
      setCreateVisible(true);

      // Create a new channel document in the channels collection
      await addDoc(collection(db, 'channels'), {
        title: `#${channel.title}`,
        image: storageImage ? storageImage : avatarUrl,
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
        createdAt: Date.now(),
        userId: user.uid,
      });

      setProgress(1);

      // Send a push notification to conform the channel creation
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Channel created!',
          body: 'You created a new channel!',
        },
        trigger: null,
      });

      // Reset the form after submitting
      resetForm();

      // Navigate to the channel list screen
      return await navigation.navigate(routes.CHANNELS);
    } catch (error) {
      // Handle the error
      setCreateVisible(false);
      console.log(error);
    }
  };

  return (
    <Screen>
      <CreationScreen
        onDone={() => setCreateVisible(false)}
        progress={progress}
        visible={createVisible}
      />

      <TopBar title="Create a new channel" />

      <View style={styles.formContainer}><AppForm
        initialValues={{
          image: null,
          images: [],
          title: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormImagePicker name="image" />

        <AppFormField
          autoCorrect={false}
          maxLength={20}
          lowercase
          name="title"
          placeholder="Channel title..."
        />

        <AppFormField
          maxLength={100}
          name="description"
          placeholder="Channel description..."
        />

        <SubmitButton title="Create" />
      </AppForm>
      </View>
    </Screen>
  );
};

// Styles
const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    marginTop: 30,
  }
});

// Export
export default ChannelEditScreen;
