import React from 'react';
import ReactDom from 'react-dom';
import App from './app';
import { CurriculumProvider } from './context/curriculum';
import { SnackbarProvider } from './context/snackbar';

ReactDom.render(
  <SnackbarProvider>
    <CurriculumProvider>
      <App />
    </CurriculumProvider>
  </SnackbarProvider>,
  document.getElementById('root')
);
