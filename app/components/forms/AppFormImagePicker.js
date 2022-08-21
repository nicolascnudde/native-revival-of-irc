/**
 * Form Image Picker component
 */
// Imports
import React from 'react';
import { useFormikContext } from 'formik';

import ImageInput from '../ImageInput';
import ImageInputList from '../ImageInputList';
import ErrorMessage from './ErrorMessage';

// Component
const AppFormImagePicker = ({ name, style }) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const imageUris = values[name];
  const imageUri = values[name];

  // Handle single image selection
  const handleSingleAdd = (uri) => {
    setFieldValue('image', uri);
  };

  const handleSingleRemove = (uri) => {
    setFieldValue(
      name,
      imageUris.filter((imageUri) => imageUri !== uri)
    );
  };

  // Handle multiple image collection
  const handleAdd = (uri) => {
    setFieldValue(name, [...imageUris, uri]);
  };

  const handleRemove = (uri) => {
    setFieldValue(
      name,
      imageUris.filter((imageUri) => imageUri !== uri)
    );
  };

  return (
    <>
      {name === 'images' && (
        <ImageInputList
          imageUris={imageUris}
          onAddImage={handleAdd}
          onRemoveImage={handleRemove}
          style={style}
        />
      )}

      {name === 'image' && (
        <ImageInput 
          imageUri={imageUri} 
          onChangeImage={uri => handleSingleAdd(uri)}
          style={style}
        />
      )}

      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

// Export
export default AppFormImagePicker;
