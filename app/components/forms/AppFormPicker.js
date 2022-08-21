/**
 * Form Picker component
 */
// Imports
import React from 'react';
import { useFormikContext } from 'formik';

import ErrorMessage from './ErrorMessage';

// Component
const AppFormPicker = ({ items, name, placeholder }) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  return (
    <>
      <AppPicker
        items={items}
        onSelectItem={(item) => setFieldValue(name, item)}
        placeholder={placeholder}
        selectedItem={values[name]}
      />

      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

// Export
export default AppFormPicker;
