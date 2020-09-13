import React from 'react';
import ReactDom from 'react-dom';
import App from './app';
import { CurriculumProvider } from './context/curriculum';

ReactDom.render(
  <CurriculumProvider>
    <App />
  </CurriculumProvider>,
  document.getElementById('root')
);
