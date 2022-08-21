/**
 * Login screen
 */
// Imports
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Image, StyleSheet } from 'react-native';

import Screen from '../components/Screen';
import {
  AppForm,
  AppFormField,
  ErrorMessage,
  SubmitButton,
} from '../components/forms';
import { useAuth } from '../firebase/auth';

// Validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

// Component
const LoginScreen = () => {
  // Get and use the login function from the authentication hook
  const { login } = useAuth();

  // Set the initial values for handling the error
  const [error, setError] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);

  handleSubmit = async ({ email, password }) => {
    try {
      const result = await login(email, password);

      return result;
    } catch (error) {
      // Handle the error
      setLoginFailed(true);
      setError(error.message);
    }
  };

  return (
    <Screen>
      <Image style={styles.logo} source={require('../assets/icon.png')} />

      <AppForm
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ErrorMessage error={error} visible={loginFailed} />

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

        <SubmitButton title="Login" />
      </AppForm>
    </Screen>
  );
};

// Styles
const styles = StyleSheet.create({
  logo: {
    marginTop: 50,
    marginBottom: 20,
    width: 80,
    height: 80,
    alignSelf: 'center',
  },
});

// Export
export default LoginScreen;
