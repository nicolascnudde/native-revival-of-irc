/**
 * Form component
 */
// Imports
import React from 'react';
import { Formik } from 'formik';

// Component
const AppForm = ({ initialValues, onSubmit, validationSchema, children }) => {
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
};

// Export
export default AppForm;
