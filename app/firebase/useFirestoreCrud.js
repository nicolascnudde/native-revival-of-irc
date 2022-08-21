/**
 * Firestore Crud hook
 */
// Imports
import React, { useEffect, useReducer } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';

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
export const useFirestoreCrud = (q) => {
  // The initial state
  const initialState = {
    status: 'idle',
    data: undefined,
    error: undefined,
  };

  // Setup our state and actions
  const [state, dispatch] = useReducer(reducer, initialState);

  // Delete a document from the firestore database
  const deleteDocument = async (q) => {
    dispatch({ type: "loading" });

    await deleteDoc(q);
    
    dispatch({ type: "success", payload: null });
  }

  return { state, deleteDocument };
}