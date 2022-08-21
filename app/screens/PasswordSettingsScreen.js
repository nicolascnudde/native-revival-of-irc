/**
 * Account Settings screen
 */
// Imports
import React from 'react';
import { Alert, StyleSheet } from 'react-native';
import { updatePassword } from 'firebase/auth';
import * as Yup from 'yup';

import { Screen } from '../components';
import { AppForm, AppFormField, SubmitButton } from '../components/forms';
import { useAuth } from '../firebase/auth';

// Validation schema
const validationSchema = Yup.object().shape({
  // Make sure the passwords match
  password: Yup.string().min(6).label('Password').required(),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match.')
    .label('Password Confirmation'),
});

// Component
const PasswordSettingsScreen = () => {
  // Get the current user
  const { user } = useAuth();

  /**
   * Firebase actions
   */
  // Handle the submit action to update the password
  const handleSubmit = async (formData) => {
    try {
      const result = await updatePassword(user, formData.password);

      Alert.alert('Success!', 'Your password has been updated.');

      return result;
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <Screen style={styles.screen}>
      <AppForm
        initialValues={{
          password: '',
          passwordConfirmation: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          name="password"
          placeholder="Enter a new password..."
          secureTextEntry={true}
        />

        <AppFormField
          name="passwordConfirmation"
          placeholder="Confirm your password..."
          secureTextEntry={true}
        />

        <SubmitButton title="Update Profile" />
      </AppForm>
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
export default PasswordSettingsScreen;
