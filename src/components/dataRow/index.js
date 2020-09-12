import React, { useState } from 'react';
import clsx from 'clsx';

import styles from './index.module.css';

const DataRow = ({
  item,
  level = 0,
  onOutdent,
  onIndent,
  path
}) => {
  console.log('path=', path);
  const [inpVal, setInpVal] = useState('');
  const nestedList = (item.children || []).map((ele, index) => {
    return <DataRow item={ele} level={level + 1} path={`${path}.${index}`} />
  })

  return (
    <>
      <div className="row">
        <div className={clsx(['col-1', styles.iconsColumn])}>
          <div className={styles.icon}><i className="fas fa-arrows-alt" /></div>
          <div onClick={onOutdent} className={styles.icon}><i className="fas fa-arrow-left" /></div>
          <div onClick={onIndent} className={styles.icon}><i className="fas fa-arrow-right" /></div>
          <div className={styles.icon}><i className="fas fa-trash-alt" /></div>
        </div>
        <div className={clsx([styles.textCol, 'col-2'])} style={{ paddingLeft: `${level * 50}px` }}>
          <div className={styles.box} />
          <input className="heading" value={inpVal} onChange={(ev) => setInpVal(ev.target.value)} />
        </div>
      </div>
      {nestedList}

    </>
  )
}

export default DataRow
