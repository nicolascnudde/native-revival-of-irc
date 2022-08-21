/**
 * Form Audio Recording Picker component
 */
// Imports
import React from 'react';
import { useFormikContext } from 'formik';

import ErrorMessage from './ErrorMessage';
import AudioRecording from '../AudioRecording';

// Component
const AppFormAudioRecording = ({ name, style }) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const recordingUri = values[name];

  // Handle single image selection
  const handleAdd = (uri) => {
    setFieldValue('recording', uri);
  };

  return (
    <>
      <AudioRecording
        recordingUri={recordingUri}
        onChangeRecording={(uri) => handleAdd(uri)}
        style={style}
      />

      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

// Export
export default AppFormAudioRecording;
