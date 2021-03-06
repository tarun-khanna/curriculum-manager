import React, { useContext, useState } from 'react';

import DataRow from './components/dataRow';
import Header from './components/header';
import { CurriculumContext } from './context/curriculum';
import { SnackbarContext } from './context/snackbar';
import { SNACK_TYPE } from './utilities/constants';

import './global.css';

const App = () => {
  const { curriculum, setCurriculum, onAdd } = useContext(CurriculumContext);
  const { showSnackbar } = useContext(SnackbarContext)
  const [newEle, setNewEle] = useState('');

  const onSaveToLocal = (notify = false) => {
    localStorage.setItem('local-curriculum', JSON.stringify(curriculum));
    if (notify) {
      showSnackbar('Saved to Local Strorage', SNACK_TYPE.SUCCESS);
    }
  }

  const onLoadFromLocal = () => {
    const localData = JSON.parse(localStorage.getItem('local-curriculum'));
    if (localData && localData.children && localData.children.length) {
      setCurriculum(localData);
    } else {
      showSnackbar('No data Found in local storage', SNACK_TYPE.FAILURE);
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

    showSnackbar('JSON downloaded', SNACK_TYPE.SUCCESS)
  }

  const onCreateNewEl = () => {
    if (!newEle) { return; }
    onAdd({ value: newEle, id: Math.random().toString(36).substr(2, 9) })
    setNewEle('');
    showSnackbar('New Element added', SNACK_TYPE.SUCCESS)
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      onCreateNewEl();
    }
  }

  return (
    <div className="main-container">
      <Header />
      {/* Curriculum Listing */}
      {curriculum && curriculum.children.map((item, index) => (
        <React.Fragment key={item.id}>
          <DataRow
            item={item}
            path={`${index}`}
          />
        </React.Fragment>
      ))}
      <div className="solid-seperator" />

      {/* Action Buttons */}
      <div className="footer">
        <input placeholder="Enter new Standard..." className="heading" value={newEle} onKeyPress={handleKeyPress} onChange={(ev) => setNewEle(ev.target.value)} />
        <button className="save-button" onClick={onCreateNewEl}> {/* Create random string id */}
          <i className="fas fa-plus-square button-icon" />Add a Standard
        </button>
        <div className="local-btns-container">
          <button onClick={onLoadFromLocal} className="local-btn local-btn-load">
            <i className="fas fa-file-upload button-icon" />
            Load JSON
          </button>
          <button className="local-btn local-btn-save" onClick={() => onSaveToLocal(true)}>
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
