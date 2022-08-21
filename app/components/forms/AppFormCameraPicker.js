/**
 * Form Image Picker component
 */
// Imports
import React from 'react';
import { useFormikContext } from 'formik';

import CameraInput from '../ImageInput';
import ErrorMessage from './ErrorMessage';

// Component
const AppFormCameraPicker = ({ name, style }) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const imageUri = values[name];

  // Handle single image selection
  const handleAdd = (uri) => {
    setFieldValue(name, uri);
  };

  return (
    <>
      <CameraInput
        imageUri={imageUri}
        onChangeImage={(uri) => handleAdd(uri)}
        style={style}
      />

      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

// Export
export default AppFormCameraPicker;
