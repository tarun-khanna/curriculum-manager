import React, { useContext } from 'react';
import clsx from 'clsx';

import { CurriculumContext } from '../../context/curriculum';
import styles from './index.module.css';

const DataRow = ({
  item,
  path
}) => {
  const pathLength = path.split('.').length; // This is the element nested level
  const {
    onRemove,
    onIndent,
    onOutdent,
    onUpdate,
    onMoveUp,
    onMoveDown
  } = useContext(CurriculumContext);

  const onInputChange = (value) => {
    onUpdate(path, value);
  }

  const nestedList = (item.children || []).map((ele, index) => {
    return (
      <React.Fragment key={item.id}>
        <DataRow item={ele} path={`${path}.${index}`} />
      </React.Fragment>
    )
  });

  let customStyles;
  switch (pathLength) {
    case 1: {
      customStyles = styles.inputLevel1;
      break;
    }
    case 2: {
      customStyles = styles.inputLevel2;
      break;
    }
    default: customStyles = styles.inputLevel3;
  }

  return (
    <>
      <div className="row">
        <div className={clsx(['col-1', styles.iconsColumn])}>
          <div onClick={() => onMoveUp(path)} className={styles.icon}><i className="fas fa-arrow-up" /></div>
          <div onClick={() => onMoveDown(path)} className={styles.icon}><i className="fas fa-arrow-down" /></div>
          <div onClick={() => onOutdent(path)} className={styles.icon}><i className="fas fa-arrow-left" /></div>
          <div onClick={() => onIndent(path)} className={styles.icon}><i className="fas fa-arrow-right" /></div>
          <div onClick={() => onRemove(path)} className={clsx([styles.icon, styles.iconBin])}><i className="fas fa-trash-alt" /></div>
        </div>
        <div className={clsx([styles.textCol, customStyles, 'col-2'])} style={{ paddingLeft: `${(pathLength - 1) * 40}px` }}>
          <div className={clsx([styles.box, 'solid-box'])} />
          <input className={clsx([styles.dataInput])} value={item.value} onChange={(ev) => onInputChange(ev.target.value)} />
        </div>
      </div>
      {nestedList}

    </>
  )
}

export default DataRow
