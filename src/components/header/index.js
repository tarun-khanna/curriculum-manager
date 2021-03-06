import React from 'react';
import clsx from 'clsx';

import styles from './index.module.css';

const Header = () => {
  return (
    <>
      <div className="solid-seperator" />
      <div className="row">
        <div className={clsx('col-1')}>
          <p className="heading">Actions</p>
          <p className="subHeading">Move, Indent, Outdent, Delete</p>
        </div>
        <div className={clsx(['col-2', styles.col2])}>
          <p className="heading">Standard</p>
          <p className="subHeading">The text of the standard</p>
        </div>
      </div>

    </>
  )
}

export default Header
