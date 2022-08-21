/**
 * Register screen
 */
// Imports
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';
import { getDownloadURL, ref } from 'firebase/storage';

import { ActivityIndicator, Screen } from '../components';
import {
  AppForm,
  AppFormField,
  ErrorMessage,
  SubmitButton,
} from '../components/forms';
import { useAuth } from '../firebase/auth';
import { storage } from '../firebase/firebase';

// Validation schema
const validationSchema = Yup.object().shape({
  username: Yup.string().required().label('Username'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

// Component
const RegisterScreen = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async ({ username, email, password }) => {
    try {
      setLoading(true);

      const avatarsArr = ['cat', 'crab', 'frog', 'dog', 'rabbit']
      const randomAvatar = avatarsArr[Math.floor(Math.random() * avatarsArr.length)];
      const avatarUrl = await getDownloadURL(ref(storage, `avatars/${randomAvatar}.png`));

      return await register(username, avatarUrl, email, password);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <>
      <ActivityIndicator visible={loading} />

      <Screen style={styles.container}>
        <AppForm
          initialValues={{
            username: '',
            email: '',
            password: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={error} />

          <AppFormField
            autoCorrect={false}
            icon="account"
            name="username"
            placeholder="Username"
            textContentType="name" // only iOS
          />

          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="email"
            keyboardType="email-address"
            name="email"
            placeholder="Email"
            textContentType="emailAddress" // only iOS
          />

          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="lock"
            placeholder="Password"
            name="password"
            secureTextEntry
            textContentType="password" // only iOS
          />

          <SubmitButton onClick={handleSubmit} title="Register" />
        </AppForm>
      </Screen>
    </>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    marginTop: 50,
    marginBottom: 20,
    width: 80,
    height: 80,
    alignSelf: 'center',
  },
});

// Export
export default RegisterScreen;
