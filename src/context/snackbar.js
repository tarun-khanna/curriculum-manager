import React, { useState, useEffect, createContext } from 'react';
import Snackbar from '../components/snackbar';
import { SNACK_TYPE } from '../utilities/constants';

export const SnackbarContext = createContext(null);

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({});

  const showSnackbar = (message, type = SNACK_TYPE.DEFAULT) => {
    setSnackbar({ message, type, visible: true })
  }

  useEffect(() => {
    if (snackbar.visible) {
      setTimeout(() => {
        setSnackbar({ visible: false })
      }, 2000);
    }
  }, [snackbar.visible]);

  return (
    <SnackbarContext.Provider
      value={{
        showSnackbar
      }}
    >
      {snackbar.visible ? <Snackbar type={snackbar.type} message={snackbar.message} /> : null}
      {children}
    </SnackbarContext.Provider>
  )
};