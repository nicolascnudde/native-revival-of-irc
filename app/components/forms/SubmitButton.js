/**
 * Submit Button component
 */
// Imports
import React from 'react';
import { useFormikContext } from 'formik';

import AppButton from '../AppButton';

// Component
const SubmitButton = ({ IconComponent, title, style }) => {
  const { handleSubmit } = useFormikContext();

  return (
    <AppButton
      IconComponent={IconComponent}
      onPress={handleSubmit}
      style={style}
      title={title}
    />
  );
};

// Export
export default SubmitButton;
