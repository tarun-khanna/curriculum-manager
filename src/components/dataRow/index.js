import React, { useContext } from 'react';
import clsx from 'clsx';

import { CurriculumContext } from '../../context/curriculum';
import styles from './index.module.css';

const DataRow = ({
  item,
  path
}) => {
  const {
    onRemove,
    onIndent,
    onOutdent,
    onUpdate,
    onMoveUp
  } = useContext(CurriculumContext);
  const onInputChange = (value) => {
    onUpdate(path, value);
  }

  const nestedList = (item.children || []).map((ele, index) => {
    return <DataRow item={ele} path={`${path}.${index}`} />
  });

  let customStyles;

  switch (path.length) {
    case 1: {
      customStyles = styles.inputLevel1;
      break;
    }

    case 3: {
      customStyles = styles.inputLevel2;
      break;
    }

    default: customStyles = styles.inputLevel3;
  }

  return (
    <>
      <div className="row">
        <div className={clsx(['col-1', styles.iconsColumn])}>
          <div onClick={() => onMoveUp(path)} className={styles.icon}><i className="fas fa-arrows-alt" /></div>
          <div onClick={() => onOutdent(path)} className={styles.icon}><i className="fas fa-arrow-left" /></div>
          <div onClick={() => onIndent(path)} className={styles.icon}><i className="fas fa-arrow-right" /></div>
          <div onClick={() => onRemove(path)} className={styles.icon}><i className="fas fa-trash-alt" /></div>
        </div>
        <div className={clsx([styles.textCol, 'col-2'])} style={{ paddingLeft: `${(path.length - 1) * 32}px` }}>
          <div className={styles.box}>
            {path}
          </div>
          <input className={clsx([styles.dataInput, customStyles])} value={item.value} onChange={(ev) => onInputChange(ev.target.value)} />
        </div>
      </div>
      {nestedList}

    </>
  )
}

export default DataRow
