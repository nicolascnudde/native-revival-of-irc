/**
 * Firebase storage hook to upload files (images, voice recordings, etc.) to Firebase storage
 *
 * !! Warning !!
 * Sadly, (on iOS?) there is a bug where images with a higher size might cause a crash to the app.
 * This bug might be related with Expo Image Picker, Firebase 9 and iOS devices.
 *
 * More info and threads about this issue:
 * https://stackoverflow.com/questions/70528896/react-native-expo-image-picker-upload-image-to-firebase-storage-v9-crash
 * https://github.com/firebase/firebase-js-sdk/issues/5848
 */
import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import uuid from 'react-native-uuid';

import { storage } from './firebase';

export const useStorage = async (uri, folder = 'images', type = 'blob') => {
  // Check which folder to upload to and generate a random ID with uuid.
  const fileRef = ref(storage, `${folder}/${uuid.v4()}`);

  // Fetch the file uri and set it to a blob
  const file = await fetch(uri);

  const bytes = await file.blob();

  // Upload the blob file to Firebase Storage
  await uploadBytesResumable(fileRef, bytes);

  // And get the newly uploaded file URL so we can add it to the Firestore database
  return await getDownloadURL(fileRef);
};
