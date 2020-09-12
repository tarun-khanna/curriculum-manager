import React, { useContext } from 'react';
import ReactDom from 'react-dom';
import DataRow from './components/dataRow';
import Header from './components/header';
import { CurriculumContext } from './context/curriculum';

import './global.css';

const App = () => {
  const { curriculum } = useContext(CurriculumContext)
  return (

    <div className="main-container">
      <Header />
      {curriculum.map((item, index) => (
        <DataRow
          item={item}
          path={`${index}`}
        />
      ))}
      <div className="solid-seperator" />
    </div>
  )
}

export default App;
