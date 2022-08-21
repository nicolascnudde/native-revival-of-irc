/**
 * Firestore query hook
 */
// Imports
import React, { useEffect, useReducer } from 'react';
import { onSnapshot, query, doc } from 'firebase/firestore';

// Reducer for hook state and actions
const reducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return { status: 'loading', data: undefined, error: undefined };
    case 'success':
      return { status: 'success', data: action.payload, error: undefined };
    case 'error':
      return { status: 'error', data: undefined, error: action.payload };
    default:
      throw new Error('invalid action');
  }
};

// Component

// Export
export const useFirestoreQuery = (q, p) => {
  // The initial state
  const initialState = {
    status: q ? 'loading' : 'idle',
    data: undefined,
    error: undefined,
  };

  // Setup our state and actions
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // We are in the loading state
    dispatch({ type: 'loading' });

    // Subscribe to query with onSnapshot
    // Will unsubscribe on cleanup since this returns an unsubscribe function
    onSnapshot(
      // Check if there is ordering, conditioning or limit
      p ? query(q, p) : query(q),
      // query(q),
      (response) => {
        // Get data for collection or doc
        const data = response.docs
          ? getCollectionData(response)
          : getDocData(response);

        dispatch({ type: 'success', payload: data });
      },
      (error) => {
        dispatch({ type: 'error', payload: error });
      }
    );
  }, []); // Only run effect if queryCached changes

  return state;
};

// Get doc data and merge doc.id
const getDocData = (response) => {
  return doc.exists === true ? { id: response.id, ...response.data() } : null;
};

// Get array of doc data from collection
const getCollectionData = (response) => {
  return response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
