/**
 * Auth hook
 */
// Imports
import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { auth, db } from './firebase';

// Create a context
const authContext = createContext();

// Publish the context re-render when needed
export const useAuth = () => {
  return useContext(authContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Login
  const login = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  // Register
  // Register
  const register = async (username, avatarUrl, email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      const user = response.user;

      await updateProfile(user, {
        displayName: username,
        photoURL: avatarUrl,
      });

      await setDoc(doc(db, 'users', user.uid), {
        id: user.uid,
        userName: user.displayName,
        email: user.email,
        avatarImage: user.photoURL,
        firstName: '',
        lastName: '',
        address: '',
        zipCode: '',
        age: '',
      });

      return response;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    return await signOut(auth);
  };

  const value = {
    login,
    logout,
    register,
    user,
  };

  return (
    <authContext.Provider value={value}>
      {!loading && children}
    </authContext.Provider>
  );
};

/*
 */
