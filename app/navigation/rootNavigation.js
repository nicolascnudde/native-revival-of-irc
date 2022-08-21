/**
 * Root Navigation
 */
// Imports
import React from 'react';

// Create the navigation ref
export const navigationRef = React.createRef();

// Component
const navigate = (name, params) => {
  navigationRef.current?.navigate(name, params);
};

// Exports
export default {
  navigate,
};
