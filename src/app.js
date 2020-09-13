import React, { useContext, useState } from 'react';
import DataRow from './components/dataRow';
import Header from './components/header';
import { CurriculumContext } from './context/curriculum';

import './global.css';

const App = () => {
  const { curriculum, setCurriculum, onAdd } = useContext(CurriculumContext);
  const [newEle, setNewEle] = useState('');

  const onSaveToLocal = () => {
    localStorage.setItem('local-curriculum', JSON.stringify(curriculum));
  }

  const onLoadFromLocal = () => {
    const localData = localStorage.getItem('local-curriculum')
    if (localData) {
      setCurriculum(JSON.parse(localData))
    }
  }

  const onDownload = () => {
    onSaveToLocal();
    const fileName = 'Curriculum_Data';
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(curriculum))}`;

    const downloadAnchorNode = document.createElement('a');

    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', `${fileName}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  React.useEffect(() => {
    onLoadFromLocal()
  }, [])

  return (

    <div className="main-container">
      <Header />
      {curriculum && curriculum.children.map((item, index) => (
        <DataRow
          item={item}
          path={`${index}`}
        />
      ))}
      <div className="solid-seperator" />
      <div className="footer">
        <input placeholder="Enter new Standard..." className="heading" value={newEle} onChange={(ev) => setNewEle(ev.target.value)} />
        <button className="save-button" onClick={() => onAdd({ value: newEle })}>
          <i className="fas fa-plus-square button-icon" />Add a Standard
        </button>
        <div className="local-btns-container">
          <button onClick={onLoadFromLocal} className="local-btn local-btn-load">
            <i className="fas fa-file-upload button-icon" />
            Load JSON
          </button>
          <button className="local-btn local-btn-save" onClick={onSaveToLocal}>
            <i className="fas fa-save button-icon" />
            Save JSON
          </button>
          <button className="local-btn local-btn-download" onClick={onDownload}>
            <i className="fas fa-download button-icon" />
            Download JSON
          </button>
        </div>
      </div>
    </div>
  )
}

export default App;
