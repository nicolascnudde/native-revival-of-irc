/**
 * Account Settings screen
 */
// Imports
import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { updateEmail, updateProfile } from 'firebase/auth';
import { doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import * as Yup from 'yup';

import { Screen } from '../components';
import {
  AppForm,
  AppFormField,
  AppFormImagePicker,
  SubmitButton,
} from '../components/forms';
import { db } from '../firebase/firebase';
import { useAuth } from '../firebase/auth';
import routes from '../navigation/routes';
import { useStorage } from '../firebase/useStorage';


// Validation schema
const validationSchema = Yup.object().shape({
  userName: Yup.string().min(1).label('User Name'),
  email: Yup.string().email().label('Email'),
  firstName: Yup.string().min(1).label('First Name'),
  lastName: Yup.string().min(1).label('Last Name'),
  age: Yup.number().min(1).label('Age'),
  address: Yup.string().min(1).label('Address'),
  zipCode: Yup.string().min(1).label('Zip Code'),
  image: Yup.string().min(1).nullable().label('Avatar Image'),
});

// Component
const ProfileSettingsScreen = ({ navigation }) => {
  const [profileData, setProfileData] = useState({});
  const { user } = useAuth();
  const userId = user.uid;

  useEffect(() => {
    const q = query(doc(db, 'users', `${userId}`));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setProfileData(querySnapshot.data());
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      // Call the useStorage hook to upload the image to firebase storage
      const storageImage = formData.image ? await useStorage(formData.image) : null;

      // Update the profile from the users collection 
      await updateDoc(doc(db, 'users', `${userId}`), {
        userName: formData.userName,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: formData.age,
        address: formData.address,
        zipCode: formData.zipCode,
        image: storageImage,
      });

      // Update the user profile from authentication
      await updateProfile(user, {
        displayName: formData.userName,
        photoURL: storageImage,
      });

      await updateEmail(user, formData.email);

      // Return to the account screen
      return navigation.navigate(routes.ACCOUNT);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <Screen style={styles.screen}>
      <ScrollView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 50 : 100}
          style={{ flex: 1 }}
        >
          <AppForm
            initialValues={{
              userName: profileData.userName,
              email: profileData.email,
              password: '',
              passwordConfirmation: '',
              firstName: profileData.firstName,
              lastName: profileData.lastName,
              age: profileData.age,
              address: profileData.address,
              zipCode: profileData.zipCode,
              image: profileData.image ? profileData.image : profileData.avatarImage,
            }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <AppFormImagePicker name="image" />

            <AppFormField name="userName" />

            <AppFormField
              name="email"
              placeholder="Enter a new email address here..."
            />

            <AppFormField
              name="firstName"
              placeholder={
                profileData.firstName
                  ? profileData.firstName
                  : 'Enter your first name here...'
              }
            />

            <AppFormField
              name="lastName"
              placeholder={
                profileData.lastName
                  ? profileData.lastName
                  : 'Enter your last name here...'
              }
            />

            <AppFormField
              keyboardType="numeric"
              maxLength={3}
              name="age"
              placeholder={
                profileData.age ? profileData.age : 'Enter your age here...'
              }
            />

            <AppFormField
              name="address"
              placeholder={
                profileData.address
                  ? profileData.address
                  : 'Enter your address here...'
              }
            />

            <AppFormField
              name="zipCode"
              placeholder={
                profileData.zipCode
                  ? profileData.zipCode
                  : 'Enter your zip code here...'
              }
            />

            <SubmitButton title="Update Profile" />
          </AppForm>
        </KeyboardAvoidingView>
      </ScrollView>
    </Screen>
  );
};

// Styling
const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 15,
  },
});

// Exports
export default ProfileSettingsScreen;
